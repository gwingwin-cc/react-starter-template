import { Dropdown, MenuProps, Space } from 'antd'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { CaretDownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useProfile } from '@context'
import { authApi } from '@services'

export const HeaderProfile: React.FC = () => {
	const { profile } = useProfile()
	const navigate = useNavigate()

	const menuItems: MenuProps['items'] = useMemo(
		() => [
			{
				label: 'ข้อมูลส่วนตัว',
				key: 'viewRoles',
				icon: <UserOutlined />,
				onClick: () => {
					navigate('/profile')
				},
			},
			{
				type: 'divider',
			},
			{
				label: 'ออกจากระบบ',
				key: 'logout',
				icon: <LogoutOutlined />,
				onClick: async () => {
					const url = await authApi.logout()
					window.location.href = url
				},
			},
		],
		[navigate],
	)

	return (
		<Space>
			<Dropdown menu={{ items: menuItems }} trigger={['click']}>
				<div className='flex justify-between items-center cursor-pointer'>
					<div className='text-[#000000a6]'>{profile.email}</div>
					<CaretDownOutlined className='text-[#00000059]' />
				</div>
			</Dropdown>
		</Space>
	)
}
