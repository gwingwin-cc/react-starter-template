import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import { IErrorContext, IErrorOptions } from './type'

export const ErrorContext = createContext<IErrorContext>({
	handleError: () => {},
})

// eslint-disable-next-line react-refresh/only-export-components
export const useError = () => useContext(ErrorContext)

export const ErrorProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [modal, setModal] = useState<{ error: any; options: IErrorOptions } | null | 'NONE'>(null)
	const [closeFunctions, setCloseFunctions] = useState<Array<() => void>>([])

	const navigate = useNavigate()

	const onCloseModal = useCallback(() => {
		setModal(null)

		if (closeFunctions.length > 0) {
			closeFunctions.forEach((closeFunction) => {
				closeFunction()
			})
			setCloseFunctions([])
		}
	}, [closeFunctions])

	useEffect(() => {
		if (modal === 'NONE') {
			Modal.destroyAll()
			return
		}
		if (modal) {
			const { error, options } = modal
			const { content, ...otherOptions } = options

			if (error?.response?.data?.statusCode === 400 && Array.isArray(error?.response?.data?.message)) {
				Modal.error({
					content: (
						<>
							<div>
								{content ||
									error?.response?.data?.error ||
									'พบข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้งหรือติดต่อผู้ดูแลระบบ'}
							</div>
							<div>{JSON.stringify(error.response?.data.message, null, 2)}</div>
						</>
					),
					width: '50vw',
					onOk: onCloseModal,
					onCancel: onCloseModal,
					...otherOptions,
				})
			} else {
				Modal.error({
					content:
						content ||
						error?.response?.data?.message ||
						'พบข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้งหรือติดต่อผู้ดูแลระบบ',
					onOk: onCloseModal,
					onCancel: onCloseModal,
					...otherOptions,
				})
			}
		}
	}, [modal, onCloseModal])

	const handleError = useCallback(
		async (error: any, options: IErrorOptions = {}) => {
			const errorStatusCode = error?.response?.data?.statusCode

			try {
				if (!options.skipRequestError) {
					if (errorStatusCode === 401) {
						localStorage.clear()
						window.location.href = '/login'
						return
					}
					if (errorStatusCode === 403) {
						navigate('/forbidden', { replace: true })
						setModal('NONE')
						return
					}
				}
			} catch (_err) {
				console.log(_err)
			}

			const { onClose } = options

			if (onClose) {
				setCloseFunctions((prevFuncs) => [...prevFuncs, onClose])
			}

			setModal((prev) => prev || { error, options })
		},
		[navigate],
	)

	const contextValue = useMemo(
		() => ({
			handleError,
		}),
		[handleError],
	)

	return <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>
}
