export interface IsOpenProps {
	open: boolean
	isOpen: React.Dispatch<React.SetStateAction<boolean>> | ((open: boolean) => void)
}

export type IFilterKey = 'status' | 'doctorCode'
