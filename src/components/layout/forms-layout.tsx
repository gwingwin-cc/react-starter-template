import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { HeaderMenu } from '@components/header-menu'
import { Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

export const FormsLayout: React.FC = () => (
	<Layout className='h-screen'>
		<Sider trigger={null} collapsible>
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

				<Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
			</Content>
		</Layout>
	</Layout>
)
