import SafeAreaLayout from '@src/components/SafeAreaLayout'
import { ICONS, IMAGES } from '@src/constants'
import { Image, Text, View } from 'react-native'
import Timer from '@src/components/Timer'
import Carousel from '@src/components/Carousel'
import Spacer from '@src/components/Spacer'
import FillButton from '@src/components/FillButton'
import IconButton from '@src/components/IconButton'
import { useState } from 'react'
import MenuModal from '@src/components/MenuModal'
import FaceDetection from '@src/components/FaceDetection'

export default function Main() {
	const carouselImages = [IMAGES.Carousel, IMAGES.Carousel, IMAGES.Carousel]
	const [isMenuVisible, setIsMenuVisible] = useState(false)
	const [isCheckAttendance, setIsCheckAttendance] = useState(false)

	const onPressCheckAttendance = () => setIsCheckAttendance(true)

	const onPressMenu = () => setIsMenuVisible(true)
	const closeMenu = () => setIsMenuVisible(false)

	return (
		<SafeAreaLayout backgroundImageSrc={IMAGES.MainBackground} backgroundOpacity={0.3}>
			<View className={'flex-1 px-[20px] py-[10px]'}>
				<View className={'w-full flex-row items-center justify-between'}>
					<Image source={IMAGES.Logo} resizeMode={'contain'} className={'w-[15%]'} />
					<Text className={'font-bold text-[24px] text-white'}>
						{'MOBIFONE IO - Hệ thống AI Chấm Công'}
					</Text>
				</View>
				<Timer />
				<Spacer height={10} />
				{!isCheckAttendance ? (
					<>
						<View className={'flex-1 items-center justify-center'}>
							<Carousel imageSources={carouselImages} />
							<Spacer height={30} />
							<FillButton label={'Chấm công'} onPress={onPressCheckAttendance} />
						</View>
						<View className={'self-start'}>
							<IconButton iconSource={ICONS.Dots} onPress={onPressMenu} />
						</View>
					</>
				) : (
					<FaceDetection closeDetection={() => setIsCheckAttendance(false)} />
				)}
			</View>

			<View className={'flex'}>
				<MenuModal isMenuVisible={isMenuVisible} closeModal={closeMenu} />
			</View>
		</SafeAreaLayout>
	)
}
