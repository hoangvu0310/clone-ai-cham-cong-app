import {
	Image,
	ImageSourcePropType,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from 'react-native'
import { COLORS, ICONS } from '@src/constants'
import { useState } from 'react'

type TextFormFieldProps = TextInputProps & {
	leadingIconSource: ImageSourcePropType
	isPassword?: boolean
}

export default function TextFormField({
	leadingIconSource,
	isPassword = false,
	...props
}: TextFormFieldProps) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<View
			className={
				'flex-row items-center justify-start gap-[10px] rounded-[30px] bg-white px-[15px] py-[8px]'
			}
		>
			<Image
				source={leadingIconSource}
				resizeMode={'contain'}
				className={'h-[30px] w-[30px]'}
				// style={{ width: 28, height: 28 }}
			/>
			<TextInput
				{...props}
				className={'flex-1 font-regular text-[16px]'}
				placeholderTextColor={COLORS.grey1}
				secureTextEntry={isPassword ? !showPassword : false}
			/>

			{isPassword ? (
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => {
						setShowPassword(!showPassword)
					}}
				>
					<Image
						source={showPassword ? ICONS.Show : ICONS.Hide}
						className={'h-[28px] w-[28px]'}
						resizeMode={'contain'}
					/>
				</TouchableOpacity>
			) : null}
		</View>
	)
}
