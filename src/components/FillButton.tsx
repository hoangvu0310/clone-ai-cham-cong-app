import { Text, TouchableOpacity, View, ViewStyle } from 'react-native'

type FillButtonProps = {
	label: string
	onPress: () => void
	buttonStyle?: ViewStyle
}

export default function FillButton({ label, onPress, buttonStyle }: FillButtonProps) {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
			<View className={'rounded-[30px] bg-primary p-[15px]'} style={[buttonStyle]}>
				<Text className={'text-center font-regular text-[18px] text-white'}>{label}</Text>
			</View>
		</TouchableOpacity>
	)
}
