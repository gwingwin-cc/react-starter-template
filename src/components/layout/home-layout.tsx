import { HeaderMenu } from '@components/header-menu'
import { Layout } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

export const HomeLayout: React.FC = () => (
	<Layout className='h-screen'>
		<HeaderMenu />
		<Content className='p-12'>
			<Outlet />

			<Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
		</Content>
	</Layout>
)
