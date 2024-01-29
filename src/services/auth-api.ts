import { ILoginForm, IUserInfo } from '@services'
import axios from 'axios'

export class AuthApi {
	private source = axios.CancelToken.source()
	private ax = axios.create({
		baseURL: '/api/auth/',
	})

	constructor() {
		this.ax.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('accessToken')
				if (token) {
					// eslint-disable-next-line no-param-reassign
					config.headers.Authorization = `Bearer ${token}`
				}
				return config
			},
			(error) => Promise.reject(error),
		)
	}

	public cancelAll = () => {
		this.source.cancel('operation was canceled')
	}

	public login = async (auth: ILoginForm) => {
		const { data } = await this.ax.post('/login', {}, { auth })
		return { accessToken: data.access_token, refreshToken: data.refresh_token } as {
			accessToken: string
			refreshToken: string
		}
	}

	public logout = async () => {
		const { data } = await this.ax.post('/logout')
		return data as string
	}

	public getMe = async () => {
		const { data } = await this.ax.get('/me')
		return data as IUserInfo
	}
}

export const authApi = new AuthApi()
