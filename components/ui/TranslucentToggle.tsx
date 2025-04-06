import { ImageSourcePropType, Pressable, StyleSheet, Text, View, Image, Animated, Platform } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics';


export default function TranslucentToggle({ title, darkMode, width, children }: {
    title?: String, darkMode?: boolean, width?: number, children?: React.ReactNode
}) {
    const [toggle, setToggle] = useState(false);
    const borderWidthAnim = useRef(new Animated.Value(0)).current;
    const borderRadiusAnim = useRef(new Animated.Value(0)).current;
    const borderColorAnim = useRef(new Animated.Value(0)).current;
    const shadowOpacityAnim = useRef(new Animated.Value(0)).current;
    const shadowRadiusAnim = useRef(new Animated.Value(0)).current;

    // Create interpolated values
    const borderWidth = borderWidthAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 2]
    });
    
    const borderColor = borderColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.1)', '#cfaa08']
    });

    const shadowOpacity = shadowOpacityAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5]
    });

    const shadowRadius = shadowRadiusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10]
    });

    const borderRadius = borderRadiusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [12, 14]
    });

    // Run animation when toggle changes
    useEffect(() => {
        Animated.parallel([
            Animated.timing(borderWidthAnim, {
                toValue: toggle ? 1 : 0,
                duration: 80,
                useNativeDriver: false
            }),
            Animated.timing(borderColorAnim, {
                toValue: toggle ? 1 : 0,
                duration: 80,
                useNativeDriver: false
            }),
            Animated.timing(shadowOpacityAnim, {
                toValue: toggle ? 1 : 0,
                duration: 80,
                useNativeDriver: false
            }),
            Animated.timing(shadowRadiusAnim, {
                toValue: toggle ? 1 : 0,
                duration: 80,
                useNativeDriver: false
            }),
            Animated.timing(borderRadiusAnim, {
                toValue: toggle ? 1 : 0,
                duration: 80,
                useNativeDriver: false
            })
        ]).start();
    }, [toggle]);

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        setToggle(prevToggle => !prevToggle);
    };

    return (
        <Animated.View style={[
            styles.container, 
            {
                borderWidth: borderWidth,
                borderColor: borderColor,
                shadowColor: "#cfaa08",
                shadowOpacity: shadowOpacity,
                shadowRadius: shadowRadius,                
                width: width ? width : 120,
                borderRadius: borderRadius,
            }
        ]}>
            <Pressable onPress={handlePress} style={[styles.pressable, toggle && {borderRadius: 16}]}>
                <BlurView tint={Platform.OS === 'ios' ? 'dark' : 'dark'} experimentalBlurMethod='none' style={[styles.blurContainer, toggle && {borderRadius:14}]} intensity={Platform.OS === 'ios' ? 30 : 80}>
                    {children ? (
                        <View>
                            {children}
                        </View>
                    ) : null}

                    {title ? (
                        <Text style={styles.text}>{title}</Text>
                    ) : null}
                </BlurView>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 12,
    },

    pressable:{
        borderRadius: 12,
        gap: 6,
        height: "100%"
    },

    blurContainer: {
        backgroundColor: Platform.OS === 'ios' ? "rgba(0, 0, 0, 0.65)" : "rgba(0, 0, 0, 0.8)",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        flexDirection: "row",
        gap: 6,
        padding: 8,
    },


    text: {
        textAlign: "center",
        fontSize: 14,
        color: "#bababa",
    },

    icon: {
        width: 20,
        height: 20,
    },

    selected: {},
})
