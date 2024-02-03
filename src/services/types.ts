export interface IQuery<
	BaseQuery extends {
		filters: Record<string, any>
		sorter: {
			orderBy?: string
		}
	} = any,
> {
	filters?: BaseQuery['filters']
	sorter?: {
		field?: BaseQuery['sorter']['orderBy']
		order?: 'ascend' | 'descend'
	}
	current?: number
	pageSize?: number
}

export interface IItemsPerPage<T> {
	list: Array<T>
	total: number
}

export interface IUpdateName {
	name: string
}

export interface IUpdateEmail {
	email: string
	password: string
}

export interface IUpdatePassword {
	currentPassword: string
	newPassword: string
}

export interface IUserInfo {
	id: number
	username: string
	email: string
	roles?: Roles[] | null
}
export interface Roles {
	id: number
	name: string
	slug: string
	createdBy: number
	updatedBy: number
	deletedBy?: null
	roleType: string
	createdAt: string
	updatedAt: string
	deletedAt?: null
	UserRoles: UserRoles
}
export interface UserRoles {
	id: number
	createdBy: number
	updatedBy: number
	deletedBy?: null
	userId: number
	roleId: number
	createdAt: string
	updatedAt: string
	deletedAt?: null
}

export interface ILoginForm {
	username: string
	password: string
}

export interface IForm {
	id: number
	name: string
	slug: string
	desc?: string
	tags?: string
	state: string
	scripts?: null
	createdBy: number
	updatedBy?: number
	deletedBy?: number
	createdAt: string
	updatedAt: string
	deletedAt?: string
	fields?: Fields[]
	relations?: null[]
	permissions?: null[]
	layouts?: Layouts[]
}

export interface Fields {
	id: number
	name: string
	slug: string
	createdBy: number
	updatedBy?: null
	deletedBy?: null
	formId: number
	fieldType: string
	componentTemplate: string
	isUnique?: null
	options?: null
	createdAt: string
	updatedAt: string
	deletedAt?: null
	hasRelation?: null
}
export interface Layouts {
	id: number
	formId: number
	iconBlobId?: null
	script?: null
	approval?: null
	enableDraftMode: number
	requireCheckMode: string
	state: string
	layout: string
	options?: null
	createdAt: string
	updatedAt: string
	deletedAt?: null
	createdBy: number
	updatedBy?: null
	deletedBy?: null
}

export interface IOrderForm {
	id?: number
	recordState: string
	recordType: string
	errors?: null
	createdAt: string
	updatedAt: string
	deletedAt?: string
	createdBy: number
	updatedBy: number
	deletedBy?: number
	client_vat: string
	order_name?: string
	order_amount?: number
	order_price?: number
	total?: number
	createdByUser: string
}

export interface ITaskForm {
	id?: number
	recordState: string
	recordType: string
	errors?: null
	createdAt: string
	updatedAt: string
	deletedAt?: string
	createdBy: number
	updatedBy: number
	deletedBy?: number

	title: string
	contact_email: string
	description: string
	priority: number | { value: number; label: string }

	createdByUser: string
}
