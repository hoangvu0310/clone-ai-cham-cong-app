import {
	Image,
	Modal,
	Pressable,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import IconButton from '@src/components/IconButton'
import { COLORS, ICONS } from '@src/constants'
import React, { useState } from 'react'
import Spacer from '@src/components/Spacer'
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { useRouter } from 'expo-router'

type MenuModalProps = {
	isMenuVisible: boolean
	closeModal: () => void
}

export default function MenuModal({ isMenuVisible, closeModal }: MenuModalProps) {
	const [isMultiCheckin, setIsMultiCheckin] = useState(false)
	const router = useRouter()
	const toggleButtonWidth = 60
	const toggleButtonHeight = 25
	const indicatorDimension = 25

	const indicatorPositionX = useSharedValue(0)
	const animatedButtonStyle = useAnimatedStyle(() => {
		const shadowRadius = interpolate(
			indicatorPositionX.value,
			[0, (toggleButtonWidth - indicatorDimension) / 2, toggleButtonWidth - indicatorDimension],
			[8, 24, 8],
		)

		return {
			transform: [
				{
					translateX: indicatorPositionX.value,
				},
			],
			shadowColor: COLORS.black,
			shadowRadius: shadowRadius,
			shadowOpacity: 0.35,
			elevation: shadowRadius,
		}
	})

	const toggleButton = () => {
		if (!isMultiCheckin) {
			indicatorPositionX.value = withTiming(toggleButtonWidth - indicatorDimension, {
				duration: 200,
			})
		} else {
			indicatorPositionX.value = withTiming(0, { duration: 200 })
		}
		setIsMultiCheckin(!isMultiCheckin)
	}

	return (
		<Modal
			visible={isMenuVisible}
			animationType={'fade'}
			transparent={false}
			backdropColor={'rgba(0, 0, 0, 0.5)'}
		>
			<TouchableWithoutFeedback onPress={closeModal}>
				<View className={'flex-1 items-center justify-center'}>
					<TouchableWithoutFeedback>
						<View className={'h-4/5 w-4/5 rounded-[20px] bg-white px-[25px] py-[20px]'}>
							<IconButton
								iconSource={ICONS.Close}
								tintColor={COLORS.black}
								onPress={closeModal}
								iconStyle={{ width: 28, height: 28 }}
								buttonStyle={{ position: 'absolute', top: 0, right: 0 }}
							/>
							<Text className={'self-center font-regular text-[24px]'}>{'TÙY CHỌN'}</Text>
							<Spacer height={15} />

							<View className={'w-full flex-row items-center justify-between py-[15px]'}>
								<View className={'flex flex-row'}>
									<Image
										source={ICONS.People}
										resizeMode={'contain'}
										className={'h-[36px] w-[36px]'}
									/>
									<Spacer width={15} />
									<Text className={'font-regular text-[24px]'}>{'Checkin nhiều người'}</Text>
								</View>
								<Pressable
									onPress={toggleButton}
									className={'relative justify-center'}
									style={{
										width: toggleButtonWidth,
										height: toggleButtonHeight,
										backgroundColor: isMultiCheckin ? COLORS.green1 : COLORS.grey1,
										borderRadius: 15,
										// borderWidth: 1,
										// borderColor: COLORS.grey1,
									}}
								>
									<Animated.View
										className={'absolute rounded-full bg-white shadow-lg'}
										style={[
											{
												width: indicatorDimension,
												height: indicatorDimension,
												elevation: 7,
											},
											animatedButtonStyle,
										]}
									/>
								</Pressable>
							</View>

							<View className={'h-[1px] bg-grey1'} />
							<TouchableOpacity activeOpacity={0.8} onPress={() => router.replace('/')}>
								<View className={'w-full flex-row items-center py-[15px]'}>
									<Image
										source={ICONS.Logout}
										resizeMode={'contain'}
										className={'h-[36px] w-[36px]'}
									/>
									<Spacer width={15} />
									<Text className={'font-regular text-[24px]'}>{'Đăng xuất'}</Text>
								</View>
							</TouchableOpacity>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}
