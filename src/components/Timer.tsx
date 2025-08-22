import { Text, View } from 'react-native'
import { useEffect, useMemo, useState } from 'react'

export default function Timer() {
	const [currentTime, setCurrentTime] = useState(new Date())

	const timeData = useMemo(() => {
		const minutes = currentTime.getMinutes()
		const hours = currentTime.getHours()
		const weekDay = currentTime.getDay()
		const date = currentTime.getDate()
		const month = currentTime.getMonth()
		const year = currentTime.getFullYear()

		return { minutes, hours, weekDay, date, month, year }
	}, [currentTime])

	const updateTime = () => setCurrentTime(new Date())

	useEffect(() => {
		const delay = 60000 - currentTime.getSeconds() * 1000

		const delayUntilNextMinute = setTimeout(() => {
			updateTime()

			const timeInterval = setInterval(() => {
				updateTime()
			}, 60000)
			return () => clearInterval(timeInterval)
		}, delay)

		return () => clearTimeout(delayUntilNextMinute)
	}, [])

	return (
		<View className={'flex-col items-center justify-center self-start'}>
			<Text
				className={'font-bold text-[36px] text-white'}
			>{`${timeData.hours < 10 ? '0' + timeData.hours : timeData.hours}:${timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes}`}</Text>
			<Text
				className={'font-regular text-[24px] text-white'}
			>{`Thứ ${timeData.weekDay + 1}, ${timeData.date}/${timeData.month + 1}/${timeData.year}`}</Text>
		</View>
	)
}
