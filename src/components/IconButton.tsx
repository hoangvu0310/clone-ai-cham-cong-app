import {
	Image,
	ImageSourcePropType,
	ImageStyle,
	StyleProp,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native'
import { COLORS } from '@src/constants'

type IconButtonProps = {
	iconSource: ImageSourcePropType
	onPress: () => void
	iconStyle?: StyleProp<ImageStyle>
	buttonStyle?: StyleProp<ViewStyle>
	tintColor?: string
}

export default function IconButton({
	iconSource,
	onPress,
	iconStyle,
	buttonStyle,
	tintColor = COLORS.white,
}: IconButtonProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Image
				source={iconSource}
				tintColor={tintColor}
				resizeMode={'contain'}
				style={[{ width: 30, height: 30 }, iconStyle]}
			/>
		</TouchableOpacity>
	)
}
