import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React from 'react'

export default function StartButton({title, onPress}:{title:String, onPress: Function}) {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={()=>onPress()}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: "black",
        fontWeight: "600"
    },
    button: {
        backgroundColor: "#d9d9d9",
        borderRadius: 20,
        height: 60,
        width: 160,
        justifyContent: "center",
        alignItems: "center"
    }
})