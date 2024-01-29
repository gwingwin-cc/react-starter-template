import { Buffer } from 'buffer'

const base64Pattern = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2})|([0-9a-zA-Z+/]{3}))?$/

export const encodeBase64 = (value: any) => Buffer.from(JSON.stringify(value), 'utf-8').toString('base64')

export const decodeBase64 = (encoded: string) => {
	try {
		return JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8')) as unknown
	} catch (err) {
		return null
	}
}

export const isBase64 = (value: string) => base64Pattern.test(value)

export const capitalizeFirstLetter = (str: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : str)

export const { compare } = new Intl.Collator(['en', 'th'], {
	sensitivity: 'case',
})

export const displayPhoneNumber = (phoneNumber: string | null | undefined) => {
	let PhoneNumber = phoneNumber
	if (!PhoneNumber) {
		return '-'
	}
	if (PhoneNumber.indexOf('-') === -1) {
		PhoneNumber = `${PhoneNumber.slice(0, 3)}-${PhoneNumber.slice(3)}`
	}
	return PhoneNumber
}

export const messageNotification = (type: string, label: string) => {
	switch (type) {
		case 'insert':
			return `เพิ่มข้อมูล ${label} สำเร็จ`

		case 'update':
			return `บันทึกข้อมูล ${label} สำเร็จ`

		case 'delete':
			return `ลบข้อมูล ${label} สำเร็จ`

		case 'error':
			return `พบข้อผิดพลาด ${label} ไม่สำเร็จ`
		default:
			return ``
	}
}

export const contentDisplay = (data: string | null | undefined) => data || '-'

export const currencyFormat = (value: string | number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
