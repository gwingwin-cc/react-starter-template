import { Modal } from 'antd'

import { FormOrder } from '@components/form'

interface ModalEditOrderProps {
	open: boolean
	onClose: (isReload: boolean) => void
	orderId: number
}

export const ModalEditOrder: React.FC<ModalEditOrderProps> = ({ open, onClose, orderId }) => (
	<Modal title='แก้ไขข้อมูล Order' open={open} destroyOnClose width='45%' onCancel={() => onClose(false)} footer={null}>
		<FormOrder triggerOrderList={() => onClose(true)} orderId={orderId} />
	</Modal>
)
