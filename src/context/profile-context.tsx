import { Spin, notification } from 'antd'
import { Suspense, createContext, useCallback, useContext, useMemo } from 'react'

import { IUserInfo, authApi } from '@services'
import { LoadingSpinner } from '@components/loading-spinner'
import { messageNotification } from '@utils'
import { useRequest } from 'ahooks'
import { useError } from './error-context'

const emptyProfile: IUserInfo = {
	id: 0,
	username: '',
	email: '',
}

export const ProfileContext = createContext<
	Readonly<{
		profile: IUserInfo
		triggerLoading: () => Promise<IUserInfo>
		openNotification: (
			type: 'success' | 'info' | 'warning' | 'error',
			message: React.ReactNode,
			description?: React.ReactNode,
		) => void
	}>
>({
	profile: emptyProfile,
	triggerLoading: async () => emptyProfile,
	openNotification: () => {},
})

// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const { handleError } = useError()
	const [api, contextHolder] = notification.useNotification()
	const {
		data: profile,
		loading,
		runAsync: triggerLoading,
	} = useRequest(authApi.getMe, {
		onError: (err) =>
			handleError(err, {
				title: 'Failed to fetch user info.',
			}),
	})

	const openNotification = useCallback(
		(type: 'success' | 'info' | 'warning' | 'error', message: React.ReactNode, description?: React.ReactNode) =>
			api[type]({ message, description }),
		[api],
	)

	const providerValue = useMemo(
		() => ({
			profile: profile || emptyProfile,
			triggerLoading,
			openNotification,
		}),
		[openNotification, profile, triggerLoading],
	)

	if (loading) {
		return <LoadingSpinner />
	}

	return (
		<ProfileContext.Provider value={providerValue}>
			<Suspense fallback={<Spin className='px-[50%] py-[20%]' />}>
				{contextHolder}
				{children}
			</Suspense>
		</ProfileContext.Provider>
	)
}
