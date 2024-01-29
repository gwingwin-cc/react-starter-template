import { ProfileProvider } from '@context'
import { Outlet } from 'react-router-dom'

export const ProtectedGuard: React.FC = () => (
	<ProfileProvider>
		<Outlet />
	</ProfileProvider>
)
