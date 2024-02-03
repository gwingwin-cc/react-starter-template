import { useError, useProfile } from '@context'
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd'

import { useCallback, useEffect, useState } from 'react'
import { RestFilled, SaveFilled } from '@ant-design/icons'
import { formApi } from '@services'
import { notifyMessage } from '@constants'
import { currencyFormat } from '@utils'
import { useRequest } from 'ahooks'
import { SpinningWrapper } from '@components/spining-wrapper'
import { IOrderForm, ITaskForm } from '../../services/types'

interface FormTaskProps {
	triggerTaskList: () => void
	taskId?: number
}

export const FormTask: React.FC<FormTaskProps> = ({ triggerTaskList, taskId }) => {
	const formId = 19
	const { openNotification } = useProfile()
	const { handleError } = useError()
	const [form] = Form.useForm<ITaskForm>()
	const [loading, isLoading] = useState<boolean>(false)

	const {
		data: dataTask,
		loading: taskLoading,
		run: triggerLoading,
	} = useRequest(() => formApi.getRecordTask(formId, taskId!), {
		manual: true,
		onError: (error) =>
			handleError(error, {
				title: 'Failed to fetch form order record.',
			}),
	})

	useEffect(() => {
		if (taskId) {
			triggerLoading()
		}
	}, [taskId, triggerLoading])

	const onFinish = useCallback(
		async (values: ITaskForm) => {
			console.log('values', values)
			isLoading(true)
			try {
				if (taskId) {
					await formApi.updateRecord(formId, taskId, values)
				} else {
					await formApi.createRecord(formId, values)
				}
				form.resetFields()
				openNotification('success', notifyMessage.success)
				triggerTaskList()
			} catch (error) {
				handleError(error, {
					title: 'Failed to save form.',
				})
			}
			isLoading(false)
		},
		[form, handleError, openNotification, taskId, triggerTaskList],
	)

	if (taskLoading) {
		return <SpinningWrapper />
	}

	return (
		<Form form={form} name='form-order' layout='vertical' onFinish={onFinish} size='large' initialValues={dataTask}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item name='title' label='Task title' rules={[{ required: true }]}>
						<Input placeholder='โปรดกรอกนะ' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='contact_email' label='Contact email' rules={[{ required: true, type: 'email' }]}>
						<Input placeholder='Email' />
					</Form.Item>
				</Col>

				<Col span={24}>
					<Form.Item name='description' label='Task desc'>
						<Input placeholder='กรอก' />
					</Form.Item>
				</Col>

				{/* <Col span={24}>
					<Form.Item name='priority' label='Priority' rules={[{ required: true, type: 'enum', enum: ['0', '1', '2'] }]}>
						<Input placeholder='กรอก' />
					</Form.Item>
				</Col> */}

				<Col span={24}>
					<Form.Item name='priority' label='Priority' rules={[{ required: true, type: 'enum', enum: ['0', '1', '2'] }]}>
						<Select
							options={[
								{ value: '0', label: 'ไม่ด่วน' },
								{ value: '1', label: 'ด่วนนะ' },
								{ value: '2', label: 'ด่วนที่สุด' },
							]}
						/>
					</Form.Item>
				</Col>
			</Row>

			<Form.Item className='flex justify-end mt-2'>
				<Button htmlType='submit' type='primary' loading={loading}>
					<SaveFilled /> Save
				</Button>
				<Button htmlType='reset' className=' ms-1'>
					<RestFilled /> Clear
				</Button>
			</Form.Item>
		</Form>
	)
}
