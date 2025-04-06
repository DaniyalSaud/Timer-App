import { ImageSourcePropType, Pressable, StyleSheet, Text, View, Image, Animated, Platform } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics';


export default function TranslucentButton({ title, darkMode, width, children }: {
    title?: String, darkMode?: boolean, width?: number, children?: React.ReactNode
}) {
    
    const handlePress = () => {
        console.log("Button Pressed");
        
    }

    return (
        <View style={[
            styles.container, 
            { width: width ? width : 100 }, 
        ]}>
            <Pressable onPress={handlePress} style={styles.pressable}>
                <BlurView tint={Platform.OS === 'ios' ? 'dark' : 'dark'} experimentalBlurMethod='none' style={styles.blurContainer} intensity={Platform.OS === 'ios' ? 30 : 80}>
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
        </View>
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
