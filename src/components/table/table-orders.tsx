import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dropdown, MenuProps, Modal, Space, Table, Typography } from 'antd'
import { IOrderForm, formApi } from '@services'
import { DATE_FORMAT, currencyFormat, format, fromNow } from '@utils'
import { notifyMessage } from '@constants'
import type { ColumnsType } from 'antd/es/table'
import useAntdTable from 'ahooks/lib/useAntdTable'
import { MoreOutlined } from '@ant-design/icons'
import { useError, useProfile } from '@context'
import { ModalEditOrder } from '@components/modal'
import { SpinningWrapper } from '@components/spining-wrapper'

const { Text } = Typography
interface TableOrdersProps {
	loading: boolean
	isLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableOrders: React.FC<TableOrdersProps> = ({ loading, isLoading }) => {
	const formId = 9
	const { openNotification } = useProfile()
	const { handleError } = useError()
	const [editOrderOpen, isEditOrderOpen] = useState<boolean>(false)
	const [orderId, setOrderId] = useState<number>()

	const {
		tableProps,
		search,
		loading: ordersLoading,
		params,
	} = useAntdTable((query) => formApi.getRecords(formId, query), {
		defaultPageSize: 5,
		onError: (err) =>
			handleError(err, {
				title: 'Failed to fetch user info.',
			}),
	})
	const { sorter = {}, filters = {} } = useMemo(() => params[0] || ({} as any), [params])

	useEffect(() => {
		if (loading) {
			search.submit()
			isLoading(false)
		}
	}, [loading, isLoading, search])

	const menuItems: MenuProps['items'] = useMemo(
		() => [
			{
				label: 'แก้ไข',
				key: 'editOrder',
			},
			{
				label: 'ลบ',
				key: 'removeOrder',
			},
		],
		[],
	)

	const confirmDelete = useCallback(
		(data: IOrderForm) => {
			Modal.confirm({
				title: 'ต้องการลบข้อมูลส่งต่อ',
				content: (
					<Space direction='vertical'>
						<Text className='text-lg'>{data.order_name}</Text>
					</Space>
				),
				okType: 'danger',
				okText: 'ลบข้อมูล',
				onOk: async () => {
					try {
						await formApi.deleteRecord(formId, data.id!)
						openNotification('success', notifyMessage.delete)
						search.submit()
					} catch (error) {
						handleError(error, { title: notifyMessage.fail })
					}
				},
			})
		},
		[handleError, openNotification, search],
	)

	const handleMenuClick = useCallback(
		(key: string, record: IOrderForm) => {
			switch (key) {
				case 'editOrder':
					setOrderId(record.id)
					isEditOrderOpen(true)
					break

				case 'removeOrder':
					confirmDelete(record)
					break
				default:
					break
			}
		},
		[confirmDelete],
	)

	const columns: ColumnsType<IOrderForm> = [
		{
			dataIndex: 'client_vat',
			title: 'Client vat',
		},
		{
			dataIndex: 'order_name',
			title: 'Name',
			sorter: true,
			sortOrder: sorter.field === 'order_name' && sorter.order,
			filters: [
				{ text: 'ทดสอบ', value: 'ทดสอบ' },
				{ text: 'Request', value: 'Request' },
			],
			filteredValue: filters.order_name,
		},
		{
			dataIndex: 'order_price',
			title: 'Price',
			render: (orderPrice) => orderPrice && currencyFormat(orderPrice),
			sorter: true,
			sortOrder: sorter.field === 'order_price' && sorter.order,
		},
		{
			dataIndex: 'order_amount',
			title: 'Amount',
		},
		{
			dataIndex: 'total',
			title: 'Total',
			render: (total) => total && <Text className=' text-xl text-green-600'>{currencyFormat(total)}</Text>,
			sorter: true,
			sortOrder: sorter.field === 'total' && sorter.order,
		},
		{
			dataIndex: 'createdAt',
			title: 'createdAt',
			render: (createdAt) => format(createdAt, DATE_FORMAT.DATE_TIME),
		},
		{
			dataIndex: 'updatedAt',
			title: 'updatedAt',
			render: (updatedAt) => (updatedAt ? fromNow(updatedAt) : '-'),
		},
		{
			key: 'action',
			width: 50,
			className: 'column-action',
			render: (_, record) => (
				<Space style={{ width: '100%', justifyContent: 'center' }}>
					<Dropdown menu={{ items: menuItems, onClick: ({ key }) => handleMenuClick(key, record) }} trigger={['click']}>
						<span style={{ fontSize: '20px', cursor: 'pointer', color: 'gray' }}>
							<MoreOutlined />
						</span>
					</Dropdown>
				</Space>
			),
		},
	]

	if (ordersLoading) {
		return <SpinningWrapper />
	}

	return (
		<>
			<Table columns={columns} rowKey='id' {...tableProps} />
			<ModalEditOrder
				open={editOrderOpen}
				onClose={(isReload = false) => {
					if (isReload) {
						search.submit()
					}
					isEditOrderOpen(false)
				}}
				orderId={orderId!}
			/>
		</>
	)
}
