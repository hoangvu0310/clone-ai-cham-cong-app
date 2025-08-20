import { View } from 'react-native'

type SpacerProps = {
	width?: number
	height?: number
}

export default function Spacer({ width, height }: SpacerProps) {
	return <View style={{ width: width, height: height }} />
}
