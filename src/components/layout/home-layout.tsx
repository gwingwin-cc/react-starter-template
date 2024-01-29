import { HeaderMenu } from '@components/header-menu'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

export const HomeLayout: React.FC = () => (
	<Layout className='h-screen'>
		<HeaderMenu />
		<Content className='p-12'>
			<Outlet />
		</Content>
	</Layout>
)
