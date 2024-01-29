import { Result } from 'antd'

export const Unauthorized: React.FC = () => (
	<Result
		className='pt-[100px]'
		status='error'
		title='Unauthorized Access'
		subTitle='You are not authorized to access this content.'
	/>
)
