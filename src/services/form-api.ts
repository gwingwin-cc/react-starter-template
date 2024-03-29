import axios from 'axios'
import { prepareQuery, prepareQueryTable } from '@utils'
import { IForm, IItemsPerPage, IOrderForm, IQuery, ITaskForm } from './types'

export class FormApi {
	private source = axios.CancelToken.source()
	private ax = axios.create({
		baseURL: '/api/forms',
	})

	public cancelAll = () => {
		this.source.cancel('operation was canceled')
	}

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

	public getForms = async (): Promise<IItemsPerPage<IForm>> => {
		const response = await this.ax.get(`/`)
		const { total, data } = response.data
		return { total, list: data }
	}

	public getForm = async (formId: number): Promise<IForm> => {
		const response = await this.ax.get(`/${formId}`, { params: { layout_state: 'ACTIVE' } })
		return response.data
	}

	public getRecord = async (formId: number, recordId: number): Promise<IOrderForm> => {
		const response = await this.ax.get(`/${formId}/records/${recordId}`)
		return response.data
	}

	public getRecordTask = async (formId: number, recordId: number): Promise<ITaskForm> => {
		const response = await this.ax.get<ITaskForm>(`/${formId}/records/${recordId}`)
		if (response.data) {
			const { priority } = response.data
			let result = ''
			switch (priority) {
				case 0:
					result = 'ไม่ด่วน'
					break
				case 1:
					result = 'ด่วน'
					break
				case 2:
					result = 'ด่วนมาก'
					break
				default:
					result = 'ไม่ด่วน'
					break
			}
			return { ...response.data, priority: { value: Number(priority), label: result } }
		}

		return response.data
	}

	public createRecord = async (formId: number, data: IOrderForm | ITaskForm): Promise<{ id: number }> => {
		// delete data.order_price
		const createData = {
			data,
			recordState: 'ACTIVE',
			recordType: 'PROD',
		}
		const response = await this.ax.post(`/${formId}/records`, createData)
		return response.data
	}

	public updateRecord = async (formId: number, recordId: number, data: IOrderForm | ITaskForm) => {
		const updateData = {
			data,
			recordState: 'ACTIVE',
		}
		const response = await this.ax.patch(`/${formId}/records/${recordId}`, updateData)
		return response.data
	}

	public deleteRecord = async (formId: number, recordId: number) => {
		const response = await this.ax.delete(`/${formId}/records/${recordId}`)
		return response.data
	}

	public getRecords = async (formId: number, query: IQuery = {}): Promise<IItemsPerPage<IOrderForm>> => {
		const response = await this.ax.get(`/${formId}/records?recordType=PROD`, {
			params: prepareQueryTable(query),
		})
		const { total, data } = response.data
		return { total, list: data }
	}
}

export const formApi = new FormApi()
