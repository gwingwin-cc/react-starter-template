import { useProfile } from '@context'
import { Outlet, useNavigate } from 'react-router-dom'

export const AdminGuard: React.FC = () => {
	const navigate = useNavigate()
	const { profile } = useProfile()
	console.log('profile.roles', profile.roles)
	if (!profile.roles?.some((role) => role.name === 'admin')) {
		navigate('/not_found')
	}

	return <Outlet />
}
