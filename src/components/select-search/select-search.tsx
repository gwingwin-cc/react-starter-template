import React, { useEffect } from 'react'
import { Select, SelectProps, Spin } from 'antd'
import { useError } from '@context'
import { debounce } from 'lodash'
import { useRequest } from 'ahooks'

interface SelectSearchProps<T> extends Omit<SelectProps<T>, 'options' | 'children'> {
	defaultData?: T
	fetchFunction: (...args: any[]) => Promise<T | any>
	debounceTimeout?: number
}

export const SelectSearch = <T extends []>(props: SelectSearchProps<T>) => {
	const { fetchFunction, defaultData, debounceTimeout = 500, ...selectProps } = props
	const { handleError } = useError()

	const {
		data: options,
		loading,
		run: triggerLoading,
	} = useRequest(fetchFunction, {
		onError: (err) =>
			handleError(err, {
				title: 'Failed to load select search component.',
			}),
	})

	// initialize value
	useEffect(() => {
		if (selectProps.value) {
			triggerLoading({ filter: { search: selectProps.value } })
		}
	}, [selectProps.value, triggerLoading])

	return (
		<Select
			{...selectProps}
			showSearch
			filterOption={false}
			onSearch={debounce((search) => search && triggerLoading({ search }), debounceTimeout)}
			options={options}
			notFoundContent={loading ? <Spin size='small' /> : null}
		/>
	)
}
