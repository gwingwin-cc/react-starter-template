import { Card, Col, Divider, Row, Space, Typography, Image, Select } from 'antd'
import { useState } from 'react'
import { FileTextOutlined } from '@ant-design/icons'
import { ambulanceActive } from '@assets/index'
import { useRequest } from 'ahooks'
import { formApi } from '@services'
import { FormOrder } from '@components/form'
import { TableOrders } from '@components/table'

const { Text } = Typography

export const HomeScreen: React.FC = () => {
	const { data: options, loading: formLoading } = useRequest(formApi.getForms)
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
						<Space>
							<Select
								className='w-64'
								placeholder='Select form'
								loading={formLoading}
								options={options && options.list.map((option) => ({ value: option.id, label: option.name }))}
							/>
						</Space>
					</Space>
					<Divider />
					<FormOrder triggerOrderList={() => isLoading(true)} />
				</Card>
			</Col>
			<Col sm={16} xs={24}>
				<Card bordered={false} className='h-full'>
					<Space direction='vertical' className='w-full text-end'>
						<Text className='text-xl text-atm-brandSky me-6'>
							<FileTextOutlined /> Order list
						</Text>
					</Space>
					<Divider />
					<TableOrders loading={loading} isLoading={isLoading} />
				</Card>
			</Col>
		</Row>
	)
}
