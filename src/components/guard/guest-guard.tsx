import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const GuestGuard: React.FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			navigate('/home')
		}
	}, [])

	return <Outlet />
}
