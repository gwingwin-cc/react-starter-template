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
import { ModalEditTask } from '@components/modal/modal-edit-task'

const { Text } = Typography
interface TableTaskProps {
	loading: boolean
	isLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableTasks: React.FC<TableTaskProps> = ({ loading, isLoading }) => {
	const formId = 19
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
				title: 'ต้องการลบข้อมูล',
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
			dataIndex: 'title',
			title: 'หัวข้อ',
		},
		{
			dataIndex: 'contact_email',
			title: 'เมล',
			sorter: true,
			sortOrder: sorter.field === 'order_name' && sorter.order,
		},
		{
			dataIndex: 'description',
			title: 'รายละเอียด',
		},
		{
			dataIndex: 'priority',
			title: 'ความสำคัญ',
			render: (priority) => {
				switch (priority) {
					case 0:
						return 'ไม่ด่วน'
					case 1:
						return 'ด่วน'
					case 2:
						return 'ด่วนมาก'
					default:
						return 'อะไรนะ'
				}
			},
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
			<ModalEditTask
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
