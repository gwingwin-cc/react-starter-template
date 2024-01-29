import { useError, useProfile } from '@context'
import { Button, Form, Input, InputNumber } from 'antd'

import { useCallback, useEffect, useState } from 'react'
import { RestFilled, SaveFilled } from '@ant-design/icons'
import { formApi } from '@services'
import { notifyMessage } from '@constants'
import { currencyFormat } from '@utils'
import { useRequest } from 'ahooks'
import { SpinningWrapper } from '@components/spining-wrapper'
import { IOrderForm } from '../../services/types'

interface FormOrderProps {
	triggerOrderList: () => void
	orderId?: number
}

export const FormOrder: React.FC<FormOrderProps> = ({ triggerOrderList, orderId }) => {
	const formId = 9
	const { openNotification } = useProfile()
	const { handleError } = useError()
	const [form] = Form.useForm<IOrderForm>()
	const [loading, isLoading] = useState<boolean>(false)

	const {
		data: dataOrder,
		loading: orderLoading,
		run: triggerLoading,
	} = useRequest(() => formApi.getRecord(formId, orderId!), {
		manual: true,
		onError: (error) =>
			handleError(error, {
				title: 'Failed to fetch form order record.',
			}),
	})

	useEffect(() => {
		if (orderId) {
			triggerLoading()
		}
	}, [orderId])

	const onFinish = useCallback(
		async (values: IOrderForm) => {
			console.log('values', values)
			isLoading(true)
			try {
				if (orderId) {
					await formApi.updateRecord(formId, orderId, values)
				} else {
					await formApi.createRecord(formId, values)
				}
				form.resetFields()
				openNotification('success', notifyMessage.success)
				triggerOrderList()
			} catch (error) {
				handleError(error, {
					title: 'Failed to save form.',
				})
			}
			isLoading(false)
		},
		[form, orderId],
	)

	if (orderLoading) {
		return <SpinningWrapper />
	}

	return (
		<Form form={form} name='form-order' layout='vertical' onFinish={onFinish} size='large' initialValues={dataOrder}>
			<Form.Item name='client_vat' label='Client vat' rules={[{ required: true }]}>
				<Input placeholder='Client vat' />
			</Form.Item>
			<Form.Item name='order_name' label='Order name' rules={[{ required: true }]}>
				<Input placeholder='Order name' />
			</Form.Item>
			<Form.Item name='order_price' label='Order price' rules={[{ required: true }]}>
				<InputNumber
					placeholder='Order price'
					formatter={(value) => (typeof value === 'string' ? currencyFormat(value) : '')}
					className='w-full'
				/>
			</Form.Item>
			<Form.Item
				name='order_amount'
				label='Order amount'
				rules={[
					{ required: true },
					{
						type: 'number',
						max: 999,
						message: 'The input is not a number, max = 999',
						transform(value) {
							return Number(value)
						},
					},
				]}
			>
				<Input placeholder='Order amount' />
			</Form.Item>
			<Form.Item dependencies={['order_price', 'order_amount']}>
				{({ getFieldValue, setFieldValue }) => {
					if (getFieldValue('order_price') && getFieldValue('order_amount')) {
						const total = parseFloat(getFieldValue('order_price')) * parseFloat(getFieldValue('order_amount'))
						if (total) {
							setFieldValue('total', total)
						}
					}

					return (
						<Form.Item name='total' label='Total' rules={[{ required: true }]}>
							<InputNumber
								placeholder='total'
								formatter={(value) => (typeof value === 'string' ? currencyFormat(value) : '')}
								className='w-full'
							/>
						</Form.Item>
					)
				}}
			</Form.Item>

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
