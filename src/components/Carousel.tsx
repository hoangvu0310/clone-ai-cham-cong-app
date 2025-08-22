import {
	FlatList,
	Image,
	ImageSourcePropType,
	LayoutChangeEvent,
	NativeScrollEvent,
	NativeSyntheticEvent,
	View,
	ViewToken,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	useAnimatedScrollHandler,
} from 'react-native-reanimated'
import { COLORS } from '@src/constants'

type CarouselProps = {
	imageSources: ImageSourcePropType[]
}

export default function Carousel({ imageSources }: CarouselProps) {
	const [currentSlide, setCurrentSlide] = useState<number>(0)
	const [isAutoSlide, setIsAutoSlide] = useState<boolean>(true)
	const [carouselWidth, setCarouselWidth] = useState<number>(0)
	const scrollX = useSharedValue(0)
	const carouselRef = useRef<FlatList>(null)
	const dotDimensions = 10

	const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
	const handleViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
		if (viewableItems.length > 0) {
			setCurrentSlide(viewableItems[0].index ?? 0)
		}
	}).current
	const getItemLayout = (data: any, index: number) => ({
		length: carouselWidth,
		offset: carouselWidth * index,
		index,
	})
	const onDragStart = () => setIsAutoSlide(false)
	const onDragEnd = () => setIsAutoSlide(true)
	const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		scrollX.value = event.nativeEvent.contentOffset.x
	}

	const onLayoutChange = (e: LayoutChangeEvent) => {
		setCarouselWidth(e.nativeEvent.layout.width)
	}

	useEffect(() => {
		if (isAutoSlide) {
			const carouselInterval = setInterval(() => {
				const nextSlideIndex = (currentSlide + 1) % imageSources.length
				carouselRef.current?.scrollToIndex({
					index: nextSlideIndex,
					animated: true,
				})
				setCurrentSlide(nextSlideIndex)
				scrollX.value = withTiming(nextSlideIndex * carouselWidth, { duration: 300 })
			}, 5000)

			return () => clearInterval(carouselInterval)
		}
	}, [currentSlide, isAutoSlide])

	return (
		<View onLayout={onLayoutChange} className={'relative w-[75%] flex-1'}>
			<FlatList
				data={imageSources}
				ref={carouselRef}
				keyExtractor={(item, index) => `${item} - ${index}`}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				pagingEnabled={true}
				scrollEnabled={true}
				scrollEventThrottle={16}
				viewabilityConfig={viewabilityConfig}
				getItemLayout={getItemLayout}
				onViewableItemsChanged={handleViewableItemsChanged}
				onScrollBeginDrag={onDragStart}
				onScrollEndDrag={onDragEnd}
				onScroll={scrollHandler}
				renderItem={({ item }) => (
					<View style={{ width: carouselWidth }}>
						<Image source={item} resizeMode={'cover'} className={'h-full w-full rounded-[10px]'} />
					</View>
				)}
			/>

			<View className={'absolute bottom-[10px] flex flex-row gap-[10px] self-center'}>
				{imageSources.map((_, index) => {
					const animatedIndicatorStyle = useAnimatedStyle(() => {
						const dotWidth = interpolate(
							scrollX.value,
							[(index - 1) * carouselWidth, index * carouselWidth, (index + 1) * carouselWidth],
							[dotDimensions, dotDimensions * 1.5, dotDimensions],
							Extrapolation.CLAMP,
						)
						return {
							width: dotWidth,
						}
					})

					return (
						<Animated.View
							key={index}
							className={`rounded-full ${currentSlide === index ? 'bg-grey1' : 'bg-white'} `}
							style={[
								{
									width: dotDimensions,
									height: dotDimensions,
									// borderRadius: dotDimensions,
									// backgroundColor: currentSlide === index ? COLORS.grey1 : COLORS.white,
								},
								animatedIndicatorStyle,
							]}
						/>
					)
				})}
			</View>
		</View>
	)
}
