import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import StartButton from '@/components/ui/StartButton';

export default function Timer() {
    const [totalSeconds, setTotalSeconds] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    
    // Animation values
    const startButtonOpacity = useRef(new Animated.Value(1)).current;
    const controlButtonsOpacity = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Animate buttons when state changes
    useEffect(() => {
        if (isRunning) {
            // Animate start button out, control buttons in
            Animated.parallel([
                Animated.timing(startButtonOpacity, {
                    toValue: 0,
                    duration: 120,
                    useNativeDriver: true
                }),
                Animated.timing(controlButtonsOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.sequence([
                    Animated.timing(buttonScale, {
                        toValue: 0.8,
                        duration: 80,
                        useNativeDriver: true
                    }),
                    Animated.timing(buttonScale, {
                        toValue: 1,
                        duration: 80,
                        useNativeDriver: true
                    })
                ])
            ]).start();
        } else {
            // Animate control buttons out, start button in
            Animated.parallel([
                Animated.timing(startButtonOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(controlButtonsOpacity, {
                    toValue: 0,
                    duration: 120,
                    useNativeDriver: true
                }),
                Animated.sequence([
                    Animated.timing(buttonScale, {
                        toValue: 0.8,
                        duration: 80,
                        useNativeDriver: true
                    }),
                    Animated.timing(buttonScale, {
                        toValue: 1,
                        duration: 80,
                        useNativeDriver: true
                    })
                ])
            ]).start();
        }
    }, [isRunning]);

    const start = () => {
        setIsPaused(false);
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTotalSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    }

    const stop = () => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setTotalSeconds(0);
        }
    };

    const pause = () => {
        if (intervalRef.current) {
            setIsPaused(true);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.timerTextContainer}>
                <Text style={styles.text}>{(minutes <= 9 ? "0" : "") + String(minutes)}:{(seconds <= 9 ? "0" : "") + String(seconds)}</Text>
            </View>

            <View style={styles.buttonHolder}>
                {/* Start button with animation */}
                <Animated.View style={{ 
                    opacity: startButtonOpacity,
                    transform: [{ scale: buttonScale }],
                    position: 'absolute',
                    zIndex: isRunning ? 0 : 1
                }}>
                    <StartButton 
                        title={"Start"} 
                        color={"#d9d9d9"} 
                        onPress={start} 
                    />
                </Animated.View>
                
                {/* Control buttons with animation */}
                <Animated.View style={{ 
                    opacity: controlButtonsOpacity,
                    transform: [{ scale: buttonScale }],
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    alignItems: "center",
                    zIndex: isRunning ? 1 : 0
                }}>
                    <StartButton 
                        title={"Stop"} 
                        color={"red"} 
                        onPress={stop} 
                        width={140} 
                    />
                    <StartButton 
                        title={!isPaused ? "Pause" : "Start"} 
                        color={"yellow"} 
                        onPress={!isPaused ? pause : start} 
                        width={140} 
                    />
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    timerTextContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 12
    },
    text: {
        fontSize: 64,
        fontWeight: 700,
        color: "white",
        backgroundColor: "green",
        width: 200,
        textAlign: "center",
    },
    buttonHolder: {
        justifyContent: "center",
        alignItems: "center",
    }
})