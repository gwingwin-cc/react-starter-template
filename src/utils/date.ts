import dayjs from 'dayjs'
import buddistEra from 'dayjs/plugin/buddhistEra'
import relativeTime from 'dayjs/plugin/relativeTime'
import th from 'dayjs/locale/th'

dayjs.extend(buddistEra)
dayjs.extend(relativeTime)

export const DATE_FORMAT = {
	DATE: 'DD/MM/BBBB',
	DATE_TIME: 'DD/MM/BBBB HH:mm:ss',
}

export const format = (
	date: string | number | Date | dayjs.Dayjs | null | undefined,
	inputFormat: string = DATE_FORMAT.DATE_TIME,
) => {
	if (!date) {
		return '-'
	}
	return dayjs(date).locale(th).format(inputFormat)
}

export const fromNow = (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
	if (!date) {
		return '-'
	}
	return dayjs(date).locale(th).fromNow()
}

export const calculateAge = (date: string | number | Date | dayjs.Dayjs | null | undefined, diffDate = dayjs(date)) => {
	if (!date) {
		return '-'
	}

	const age = []
	const birthDate = dayjs()
	const year = [birthDate.year(), diffDate.year()]
	let yearDiff = year[0] - year[1]
	const month = [birthDate.month(), diffDate.month()]
	let monthDiff = month[0] - month[1]
	const day = [birthDate.date(), diffDate.date()]
	let dayDiff = day[0] - day[1]
	if ((monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) && yearDiff > 0) --yearDiff
	if (monthDiff < 0 && yearDiff > 0 && yearDiff > 0) monthDiff += 12

	if (dayDiff < 0) {
		birthDate.month(month[1] + 1)
		dayDiff = birthDate.date() - day[1] + day[0]
		--monthDiff
	}
	if (yearDiff > 0) age.push(`${yearDiff} ปี`)
	if (monthDiff > 0) age.push(`${monthDiff} เดือน`)
	if (dayDiff > 0) {
		age.push(`${dayDiff} วัน`)
	} else {
		age.push(`${dayDiff} วัน`)
	}

	return age.join(' ')
}
