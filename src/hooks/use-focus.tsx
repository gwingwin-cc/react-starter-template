import { InputRef } from 'antd'
import { useCallback, useMemo, useRef } from 'react'

export const useFocus = (): [React.RefObject<InputRef>, VoidFunction] => {
	const inputRef = useRef<InputRef>(null)
	const setFocus = useCallback(() => {
		setTimeout(() => {
			if (inputRef.current) inputRef.current.focus()
		}, 200)
	}, [inputRef])

	return useMemo(() => [inputRef, setFocus], [inputRef, setFocus])
}
