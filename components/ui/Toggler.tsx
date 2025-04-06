import { StyleSheet, View, Image, ImageSourcePropType, Pressable, Animated } from 'react-native'
import React, { useRef, useState } from 'react'

export default function Toggler({ onIconPath, offIconPath }: { onIconPath: ImageSourcePropType, offIconPath: ImageSourcePropType }) {
    const [selectedLeft, setSelectedLeft] = useState(true);
    const [selectedRight, setSelectedRight] = useState(false);
    
    // Use Animated.Value instead of ValueXY since we're only animating horizontally
    const slideAnim = useRef(new Animated.Value(0)).current;

    const slideToRight = () => {
        Animated.timing(slideAnim, {
            toValue: 1,  // Use 1 for the right position
            duration: 100,
            useNativeDriver: true
        }).start();
    }

    const slideToLeft = () => {
        Animated.timing(slideAnim, {
            toValue: 0,  // Use 0 for the left position
            duration: 100,
            useNativeDriver: true
        }).start();
    }

    // Calculate the slider position based on the animated value
    const sliderPosition = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 50]  // Moves from left (0) to right 50px (50% of container width)
    });

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.animSlider, 
                    {
                        transform: [{ translateX: sliderPosition }]
                    }
                ]}
            />
            <Pressable 
                onPress={() => {
                    setSelectedLeft(true);
                    setSelectedRight(false);
                    slideToLeft();
                }}
                style={styles.toggleLeft}
            >
                <Image 
                    style={[
                        styles.icon, 
                        selectedLeft && styles.iconSelected
                    ]} 
                    source={onIconPath} 
                />
            </Pressable>

            <Pressable 
                onPress={() => {
                    setSelectedLeft(false);
                    setSelectedRight(true);
                    slideToRight();
                }}
                style={styles.toggleRight}
            >
                <Image 
                    style={[
                        styles.icon, 
                        selectedRight && styles.iconSelected
                    ]} 
                    source={offIconPath} 
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 100,
        backgroundColor: "#121212",
        borderRadius: 1000000,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
        position: "relative",
    },
    icon: {
        height: 26,
        width: 26,
        marginLeft: 4,
        marginRight: 4,
    }, 
    iconSelected: {
        // Apply different styling for selected icon if needed
    },
    toggleLeft: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        zIndex: 1
    },
    toggleRight: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        zIndex: 1     
    },
    animSlider: {
        position: "absolute",
        width: "50%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 1000000,
        zIndex: 0
    }
})