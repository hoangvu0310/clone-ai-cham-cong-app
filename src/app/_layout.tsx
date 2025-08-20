import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '@/global.css'
import { StatusBar } from 'expo-status-bar'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [fontsLoaded, error] = useFonts({
		MontserratRegular: require('@assets/fonts/Montserrat-Regular.ttf'),
		MontserratBold: require('@assets/fonts/Montserrat-Bold.ttf'),
	})

	useEffect(() => {
		if (error) console.error(error)
		if (fontsLoaded && !error) SplashScreen.hideAsync()
	})

	return (
		<SafeAreaProvider>
			<Stack>
				<Stack.Screen name={'auth'} options={{ headerShown: false }} />
				<Stack.Screen name={'main'} options={{ headerShown: false }} />
				{/*<Stack.Screen/>*/}
			</Stack>

			<StatusBar style={'light'} />
		</SafeAreaProvider>
	)
}
