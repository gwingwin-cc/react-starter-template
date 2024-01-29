import { IQuery } from '@services'
import { isEmpty, isPlainObject } from 'lodash'

export const flatten = (obj: Record<string, any>, prefix: string = ''): Record<string, any> =>
	Object.entries(obj).reduce((result, [key, value]) => {
		const currentKey = prefix ? `${prefix}.${key}` : key

		if (isPlainObject(value)) {
			return { ...result, ...flatten(value, currentKey) }
		}

		result[currentKey] = value

		return result
	}, {} as Record<string, any>)

export const prepareQuery = ({ filters = {}, sorter = {}, current = 0, pageSize = 1000 }: IQuery) => ({
	...flatten(filters, 'filters'),
	...sorter,
	current,
	pageSize,
})

// current to skip, pageSize to take use table
export const prepareQueryTable = ({ filters = {}, sorter = {}, current = 1, pageSize = 10 }: IQuery) => {
	const temSorter = isEmpty(sorter) ? {} : { orderBy: sorter.field, orderType: sorter.order }
	return {
		...flatten(filters, 'filters'),
		...temSorter,
		skip: (current - 1) * pageSize,
		limit: pageSize,
	}
}
