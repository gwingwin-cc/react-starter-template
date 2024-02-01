import { Modal } from 'antd'

import { FormOrder } from '@components/form'
import { FormTask } from '@components/form/form-task'

interface ModalEditOrderProps {
	open: boolean
	onClose: (isReload: boolean) => void
	orderId: number
}

export const ModalEditTask: React.FC<ModalEditOrderProps> = ({ open, onClose, orderId }) => (
	<Modal title='แก้ไขข้อมูล Task' open={open} destroyOnClose width='45%' onCancel={() => onClose(false)} footer={null}>
		<FormTask triggerTaskList={() => onClose(true)} taskId={orderId} />
	</Modal>
)
