import { AppState, Image, LayoutChangeEvent, Text, View } from 'react-native'
import { COLORS, ICONS } from '@src/constants'
import Spacer from '@src/components/Spacer'
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import { useEffect, useState } from 'react'
import IconButton from '@src/components/IconButton'

type FaceDetectionProps = {
	closeDetection: () => void
}

export default function FaceDetection({ closeDetection }: FaceDetectionProps) {
	const { hasPermission, requestPermission } = useCameraPermission()
	const device = useCameraDevice('front')
	const [data, setData] = useState({ width: 0, height: 0 })
	const [appState, setAppState] = useState(AppState.currentState)

	const onLayout = (e: LayoutChangeEvent) => {
		setData(e.nativeEvent.layout)
	}

	useEffect(() => {
		const requestDevicePermission = async () => {
			if (!hasPermission) {
				await requestPermission()
			}
		}

		requestDevicePermission()
	}, [])

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextAppState) => {
			console.log('AppState changed to', nextAppState)
			setAppState(nextAppState)
		})

		return () => {
			subscription.remove()
		}
	}, [])

	return (
		<View className={'flex-1 flex-row gap-[40px]'}>
			<View onLayout={onLayout} className={'relative flex-1 p-[40px]'}>
				{hasPermission && device && (
					<Camera
						style={{
							width: '100%',
							height: '100%',
						}}
						device={device}
						isActive={appState === 'active'}
					/>
				)}
				<IconButton
					iconSource={ICONS.Close}
					tintColor={COLORS.grey1}
					onPress={closeDetection}
					buttonStyle={{ position: 'absolute', bottom: data.height - 40 - 80, right: 10 }}
				/>
			</View>
			<View className={'flex items-center justify-center gap-[5px] px-[50px]'}>
				<Image
					source={ICONS.FaceDetection}
					tintColor={COLORS.white}
					resizeMode={'contain'}
					className={'h-[100px] w-[100px]'}
				/>
				<Spacer height={20} />
				<Text className={'font-bold text-white'}>{'MOBIFONE AI Xin chào'}</Text>
				<Text className={'font-regular text-white'}>{'Vui lòng nhìn vào màn hình để checkin'}</Text>
			</View>
		</View>
	)
}
