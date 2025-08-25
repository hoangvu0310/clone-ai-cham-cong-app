import { Image, LayoutChangeEvent, Text, View } from 'react-native'
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

	return (
		<View className={'flex-1 flex-row gap-[40px]'}>
			<View onLayout={onLayout} className={'relative flex-1'}>
				{hasPermission && device && (
					<Camera
						style={{
							width: '100%',
							height: '100%',
						}}
						device={device}
						isActive={true}
					/>
				)}
				<IconButton
					iconSource={ICONS.Close}
					tintColor={COLORS.grey1}
					onPress={closeDetection}
					buttonStyle={{ position: 'absolute', bottom: data.height - 40, right: 10 }}
				/>
			</View>
			<View className={'flex items-center justify-center gap-[5px]'}>
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
