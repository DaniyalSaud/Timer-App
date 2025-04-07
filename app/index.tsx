import { StyleSheet, Text, View, Image, ImageBackground, Button, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StartButton from '@/components/ui/StartButton'
import Toggler from '@/components/ui/Toggler'
import TimerIcon from '@/assets/images/stopwatch.png'
import StopwatchIcon from '@/assets/images/timer.png'
import Forest from '@/assets/images/Forest.png'
import TranslucentToggle from '@/components/ui/TranslucentToggle'
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import TranslucentButton from '@/components/ui/TranslucentButton'
import Timer from "@/components/Timer"
import Stopwatch from "@/components/Stopwatch"
export default function index() {
    const [state, setState] = useState("timer");

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {/* {Header} */}
                <View style={styles.top_view}>
                    <Text style={{ padding: 6, color: "white" }}>Achievement</Text>
                    <Text style={{ padding: 6, color: "white" }}>Settings</Text>
                </View>

                <View style={{ justifyContent: "center", alignItems: 'center', paddingBottom: 20, paddingTop: 10 }}>
                    <Toggler onIconPath={TimerIcon} offIconPath={StopwatchIcon} stateHandler={setState}/>
                </View>

                <View style={styles.window_box}>
                    <ImageBackground source={Forest} style={styles.window_image}>
                        <View style={{ padding: 24, justifyContent: "space-between", flex: 1 }}>
                            <View style={styles.option_top}>
                                <TranslucentToggle width={50}>
                                    <MaterialCommunityIcons name="vibrate" size={26} color="rgba(255,255,255, 0.7)" />
                                </TranslucentToggle>
                                <TranslucentButton width={160} title={'Change Theme'}>
                                    <Ionicons name="shuffle-outline" size={20} color="rgba(255,255,255, 0.7)" />
                                </TranslucentButton>
                            </View>

                            <View style={styles.option_bottom}>
                                <TranslucentButton width={84} title={'Music'}>
                                    <Foundation name="music" size={20} color="rgba(255,255,255, 0.7)" />
                                </TranslucentButton>
                                <TranslucentToggle width={86} title={'Chime'}>
                                    <MaterialCommunityIcons name="bell-ring" size={20} color="rgba(255,255,255, 0.7)" />
                                </TranslucentToggle>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        {
                            (state == "timer") ? <Timer  /> : <Stopwatch />
                        }
                    </View>

                    

                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b2b2b",
        paddingTop: 10,
        paddingBottom: 34,
        paddingLeft: 18,
        paddingRight: 18,
        justifyContent: "space-between"
    },
    top_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
    },
    text: {
        color: "white",
        fontSize: 14,
    },

    window_box: {
        height: "55%",
        width: "100%",
        borderRadius: "8%",
        borderBlockColor: "white",
        borderColor: "white",
        borderWidth: 3,
        overflow: "hidden"
    },
    window_image: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        borderRadius: "8%",
    },

    option_top: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    option_bottom: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 14,
    }

})