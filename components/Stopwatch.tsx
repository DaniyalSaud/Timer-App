import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StartButton from '@/components/ui/StartButton'

export default function Stopwatch() {

  const start = () =>{
    console.log("Started!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.stopwatchTextContainer}>
        <Text style={styles.text}>60:00</Text>
      </View>
      
      <View style={{backgroundColor:"orange", width: 200, height: 30}}>
        <Text>Slider</Text>
      </View>

      <View style={styles.buttonHolder}>
        <StartButton title={"Start"} color={"#d9d9d9"} onPress={start}/>
      </View>

    </View>


  )
}

const styles = StyleSheet.create({
  container: {

  },
  stopwatchTextContainer: {
    justifyContent: "center",
    alignItems: "center",
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