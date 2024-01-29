import { ModalFuncProps } from 'antd'

export interface IErrorOptions extends Omit<ModalFuncProps, 'onOk' | 'onCancel'> {
	onClose?: () => void
	skipRequestError?: boolean
}

export interface IErrorContext {
	handleError: (error: any, options?: IErrorOptions) => void
}
