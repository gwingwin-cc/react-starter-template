import { Card, Col, Divider, Row, Space, Typography, Image, Select } from 'antd'
import { useState } from 'react'
import { FileTextOutlined } from '@ant-design/icons'
import { ambulanceActive } from '@assets/index'
import { useRequest } from 'ahooks'
import { formApi } from '@services'
import { FormOrder } from '@components/form'
import { TableOrders } from '@components/table'
import { FormTest } from '@components/form/form-test'
import { FormTask } from '@components/form/form-task'
import { TableTasks } from '@components/table/table-task'

const { Text } = Typography

export const FormScreen: React.FC = () => {
	const [loading, isLoading] = useState<boolean>(false)

	return (
		<Row gutter={16}>
			<Col sm={8} xs={24}>
				<Card bordered={false} className='h-full'>
					<Space className='w-full justify-end' align='center'>
						<Space>
							<Image src={ambulanceActive} preview={false} height={18} />
						</Space>
						<Space className='text-xl'>บันทึกบ้อมูล</Space>
					</Space>
					<Divider />
					<FormTask triggerTaskList={() => isLoading(true)} />
				</Card>
			</Col>
			<Col sm={16} xs={24}>
				<Card bordered={false} className='h-full'>
					<Space direction='vertical' className='w-full text-end'>
						<Text className='text-xl text-atm-brandSky me-6'>
							<FileTextOutlined /> Task list
						</Text>
					</Space>
					<Divider />
					<TableTasks loading={loading} isLoading={isLoading} />
				</Card>
			</Col>
		</Row>
	)
}
