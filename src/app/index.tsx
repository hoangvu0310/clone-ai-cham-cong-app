import SafeAreaLayout from '@src/components/SafeAreaLayout'
import {
	ActivityIndicator,
	Keyboard,
	KeyboardAvoidingView,
	Modal,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { COLORS, ICONS, IMAGES } from '@src/constants'
import TextFormField from '@src/components/TextFormField'
import FillButton from '@src/components/FillButton'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function Index() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const loginSchema = z.object({
		username: z.string().min(1, 'Thiếu tài khoản'),
		password: z.string().min(1, 'Thiếu mật khẩu'),
	})

	const loginForm = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onLogin = () => {
		setIsLoading(true)
		setTimeout(() => {
			router.push('/main')
			setIsLoading(false)
			loginForm.reset()
		}, 2000)

		// router.push('/main')
	}

	return (
		<SafeAreaLayout backgroundImageSrc={IMAGES.AuthBackground} backgroundOpacity={0.6}>
			<KeyboardAvoidingView className={'flex-1'} behavior={'padding'}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className={'flex-1 items-center justify-center'}>
						<View className={'w-1/2 gap-[15px]'}>
							<Text className={'mb-[20px] text-center font-bold text-[28px] text-white'}>
								{'AI Chấm Công'}
							</Text>
							<Controller
								control={loginForm.control}
								name={'username'}
								render={({ field: { value, onChange } }) => (
									<TextFormField
										leadingIconSource={ICONS.User}
										placeholder={'Tài khoản'}
										value={value}
										onChangeText={(text) => onChange(text)}
									/>
								)}
							/>
							<Controller
								control={loginForm.control}
								name={'password'}
								render={({ field: { value, onChange } }) => (
									<TextFormField
										leadingIconSource={ICONS.Lock}
										isPassword={true}
										placeholder={'Mật khẩu'}
										value={value}
										onChangeText={(text) => onChange(text)}
									/>
								)}
							/>

							<FillButton
								label={'ĐĂNG NHẬP'}
								onPress={loginForm.handleSubmit(onLogin)}
								buttonStyle={{ width: '60%', alignSelf: 'center', marginTop: 20 }}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>

			<Modal visible={isLoading} transparent={true}>
				<View
					className={'flex-1 items-center justify-center'}
					style={{
						backgroundColor: `rgba(0, 0, 0, 0.5)`,
					}}
				>
					<ActivityIndicator color={COLORS.primary} size={60} />
				</View>
			</Modal>
		</SafeAreaLayout>
	)
}
