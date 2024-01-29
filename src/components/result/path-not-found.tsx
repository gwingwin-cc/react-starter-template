import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export const PathNotFound: React.FC = () => {
	const navigate = useNavigate()

	return (
		<Result
			className='bg-white w-[850px] mx-auto mt-[100px]'
			status='404'
			title='ไม่พบหน้าที่คุณกำลังค้นหาอยู่'
			subTitle='กรุณาตรวจสอบลิงก์อีกครั้ง'
			extra={
				<Button type='primary' onClick={() => navigate('/home')}>
					กลับหน้าหลัก
				</Button>
			}
		/>
	)
}
