import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import React from 'react'
import { ImageBackground, ImageSourcePropType, View } from 'react-native'

type SafeAreaLayoutProps = React.PropsWithChildren<SafeAreaViewProps> & {
	backgroundImageSrc: ImageSourcePropType
	backgroundOpacity?: number
}

export default function SafeAreaLayout({
	children,
	backgroundImageSrc,
	backgroundOpacity = 0.5,
	...props
}: SafeAreaLayoutProps) {
	return (
		<SafeAreaView {...props} className={'flex-1 bg-black'}>
			<ImageBackground source={backgroundImageSrc} resizeMode={'stretch'} className={'flex-1'}>
				<View
					className={'flex-1'}
					style={{
						backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
					}}
				>
					{children}
				</View>
			</ImageBackground>
		</SafeAreaView>
	)
}
