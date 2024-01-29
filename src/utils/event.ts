export const isKeyboardEvent = (event: Event): event is KeyboardEvent => (event as KeyboardEvent)?.key !== undefined
