import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import StartButton from '@/components/ui/StartButton';

export default function Timer() {
    const [seconds, setSeconds] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        setMinutes(Math.floor(seconds / 60));
        setSeconds(Math.floor(seconds % 60));
    }, [seconds])

    const start = () => {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    }

    const stop = () => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setSeconds(0);
        }
    };

    const pause = () => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return (
        <View>
            <View style={styles.timerTextContainer}>
                <Text style={styles.text}>{minutes}:{seconds}</Text>
            </View>

            <View style={styles.button}>
                <StartButton title={isRunning? 'Stop' : 'Start'} onPress={isRunning? stop : start} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    timerTextContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 64,
        fontWeight: 700,
        color: "white",
        backgroundColor: "green",
    },
    button: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
})