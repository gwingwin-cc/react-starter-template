import { Button, Form, Input, Space, Typography } from 'antd'
import { useError, useProfile } from '@context'
import { useCallback } from 'react'

import '../../styles/login.scss'
import { ILoginForm, authApi } from '@services'
import { useNavigate } from 'react-router-dom'

import { loginLogo } from '@assets/index'

const { Title } = Typography

export const LoginScreen: React.FC = () => {
	const { handleError } = useError()
	const { triggerLoading } = useProfile()
	const navigate = useNavigate()

	const onFinishForm = useCallback(async (values: ILoginForm) => {
		try {
			const { accessToken, refreshToken } = await authApi.login(values)
			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', refreshToken)
			// fetch user info
			await triggerLoading()
			navigate('/')
		} catch (err) {
			handleError(err, { title: 'พบปัญหาการเข้าสู่ระบบ', skipHandleRequestError: true })
		}
	}, [])

	return (
		<Space className='login-page'>
			<div className='login-box'>
				<Form name='login-form' layout='vertical' onFinish={onFinishForm} requiredMark={false}>
					<Title>Welcome back</Title>
					<Form.Item label='Username' name='username' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label='Password' name='password' rules={[{ required: true }]}>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' className='login-form-button'>
							LOGIN
						</Button>
					</Form.Item>
				</Form>
				<div className='illustration-wrapper'>
					<img src={loginLogo} alt='Login' />
				</div>
			</div>
		</Space>
	)
}
