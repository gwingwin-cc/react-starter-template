import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { HeaderMenu } from '@components/header-menu'
import { Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export const FormLayout: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false)
	const params = useParams()
	useEffect(() => {
		console.log('params', params)
	}, [])
	return (
		<Layout className='h-screen'>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='demo-logo-vertical' />
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '1',
							icon: <UserOutlined />,
							label: 'nav 1',
						},
						{
							key: '2',
							icon: <VideoCameraOutlined />,
							label: 'nav 2',
						},
						{
							key: '3',
							icon: <UploadOutlined />,
							label: 'nav 3',
						},
					]}
				/>
			</Sider>
			<Layout className='h-screen'>
				<HeaderMenu />
				<Content className='p-12'>
					<Outlet />
				</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
			</Layout>
		</Layout>
	)
}
