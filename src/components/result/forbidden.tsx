import { Result } from 'antd'

export const Forbidden: React.FC = () => (
	<Result
		className='pt-[100px]'
		status='error'
		title='Forbidden Access'
		subTitle='You do not have the permission to access this content.'
	/>
)
