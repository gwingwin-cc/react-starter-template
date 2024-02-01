import { Affix, Col, Image, Menu, MenuProps, Row } from 'antd'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { logo } from '@assets/index'
import { HeaderProfile } from './header-profile'

export const HeaderMenu: React.FC = () => {
	const { pathname } = useLocation()

	const menuItems: MenuProps['items'] = useMemo(
		() => [
			{
				label: <Link to={{ pathname: '/home' }}>Home</Link>,
				key: '/home',
			},
			{
				label: <Link to={{ pathname: '/form-task' }}>Form Task</Link>,
				key: '/form-task',
			},
			{
				label: <Link to={{ pathname: '/profile' }}>Profile</Link>,
				key: '/profile',
			},
		],
		[],
	)

	const current = useMemo(() => `/${pathname.split('/')[1]}`, [pathname])
	return (
		<Affix>
			<div
				style={{ borderBottom: '1px solid #d9d9d9', paddingBottom: '5px', marginTop: '5px', backgroundColor: 'white' }}
			>
				<Row align='middle' className='mx-2'>
					<Col xl={4} xxl={3}>
						<Link to={{ pathname: '/home' }}>
							<Image src={logo} className='ms-2 cursor-pointer' preview={false} height={64} />
						</Link>
					</Col>
					<Col
						xl={17}
						xxl={18}
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Menu
							className='border-b-0 text-base min-w-full justify-center'
							mode='horizontal'
							selectedKeys={[current]}
							items={menuItems}
						/>
					</Col>
					<Col xl={3} xxl={2} className=' text-right'>
						<HeaderProfile />
					</Col>
				</Row>
			</div>
		</Affix>
	)
}
