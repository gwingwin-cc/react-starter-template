export {}

declare global {
	// use when object is not sure to be called with valid key so the value might be undefined
	type Dictionary<K extends string, T> = Partial<Record<K, T>>

	// use when object surely has only string keys
	type KeyOf<T extends {}> = Extract<keyof T, string>
}
