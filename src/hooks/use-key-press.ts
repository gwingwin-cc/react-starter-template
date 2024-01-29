import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	KeyboardEvent as KeyboardEventReact,
	MutableRefObject,
} from 'react'
import { isKeyboardEvent } from '@utils'
import { isNil } from 'lodash'
import { InputRef } from 'antd'
import useEffectEvent from './use-effect-event'

// ref https://github.com/uidotdev/usehooks/pull/217#issuecomment-1679267853

export const useKeyPress = (
	key: string,
	cb: (e: KeyboardEvent) => void,
	options?: {
		event?: keyof GlobalEventHandlersEventMap
		target?: Window | HTMLElement
		eventOptions?: AddEventListenerOptions
	},
) => {
	const { event = 'keydown', eventOptions } = options ?? {}
	const eventOptionsRef = useRef(eventOptions)

	const onEvent: EventListener = useEffectEvent((_event: Event) => {
		if (isKeyboardEvent(_event) && _event.key === key) {
			cb(_event)
		}
	})

	useEffect(() => {
		const target = options?.target ?? window
		target.addEventListener(event, onEvent, eventOptionsRef.current)

		return () => {
			target.removeEventListener(event, onEvent)
		}
	}, [options?.target, event, onEvent])
}

export const useKeyPressUpDown = (
	open: boolean,
	data: Array<any>,
): [(el: HTMLDivElement | null) => void, number, React.Dispatch<React.SetStateAction<number>>] => {
	const [keyPressIndex, setKeyPressIndex] = useState<number>(0)
	const scrollRefs = useRef<Array<HTMLDivElement>>([])

	useEffect(() => {
		if (open) setKeyPressIndex(0)
	}, [open])

	const onKeyPress = useCallback(
		(e: KeyboardEvent) => {
			if (!open || data.length === 0) return
			let prev = keyPressIndex - 1
			if (e.key === 'ArrowDown') {
				prev = keyPressIndex + 1
			}
			if (prev < 0 || prev > data.length - 1) return
			setKeyPressIndex(prev)
			if (scrollRefs.current[prev]) {
				scrollRefs.current[prev].scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				})
			}
		},
		[data, keyPressIndex, open],
	)

	useKeyPress('ArrowUp', onKeyPress)
	useKeyPress('ArrowDown', onKeyPress)

	const refDivScroll = useCallback((el: HTMLDivElement | null) => {
		if (el && scrollRefs.current) {
			scrollRefs.current.push(el)
		}
	}, [])

	return useMemo(() => [refDivScroll, keyPressIndex, setKeyPressIndex], [keyPressIndex, refDivScroll])
}

export const useFocusOnEnter = (
	inputRefs: MutableRefObject<InputRef[]>,
	handleEnd: () => void,
): [(ref: InputRef) => void, (e: KeyboardEventReact<HTMLFormElement>) => void] => {
	// const inputRefs = useRef<InputRef[]>([])

	useEffect(() => {
		if (inputRefs.current && inputRefs.current.length > 0) {
			setTimeout(() => {
				inputRefs.current[0].focus()
			}, 300)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputRefs.current])

	const onKeyPress = useCallback(
		(e: KeyboardEventReact<HTMLFormElement>) => {
			if (e.key === 'Enter') {
				const index = Array.prototype.indexOf.call(e.currentTarget, e.target)
				const nextFocus = index + 1
				if (nextFocus < e.currentTarget.getElementsByTagName('INPUT').length) {
					inputRefs.current[nextFocus].focus()
				} else {
					handleEnd()
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[inputRefs.current],
	)

	const setInput = useCallback(
		(ref: InputRef) => {
			if (ref && inputRefs.current) {
				const oldRef = inputRefs.current.find((e) => e.input?.id === ref.input?.id)
				if (isNil(oldRef)) {
					inputRefs.current.push(ref)
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[inputRefs.current],
	)

	return [setInput, onKeyPress]
}
