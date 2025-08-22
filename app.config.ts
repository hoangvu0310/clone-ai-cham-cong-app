import { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
	return {
		...config,
		name: 'CloneAppAIChamCong',
		slug: 'CloneAppAIChamCong',
		version: '1.0.0',
		orientation: 'landscape',
		icon: './assets/images/icon.png',
		scheme: 'cloneappaichamcong',
		userInterfaceStyle: 'automatic',
		newArchEnabled: true,

		splash: {
			image: './assets/images/splash-icon.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/images/adaptive-icon.png',
				backgroundColor: '#ffffff',
			},
			edgeToEdgeEnabled: true,
			package: 'com.anonymous.CloneAppAIChamCong',
		},
		web: {
			bundler: 'metro',
		},
		plugins: ['expo-router', 'expo-font', 'react-native-vision-camera'],
		experiments: {
			typedRoutes: true,
		},
	}
}
