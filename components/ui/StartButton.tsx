import { StyleSheet, View, TouchableOpacity, Text, ColorValue } from 'react-native'
import React from 'react'

export default function StartButton({title, color, onPress, width}:{title:String, color: ColorValue, onPress: Function, width?: number}) {
  return (
    <View>
      <TouchableOpacity style={[styles.button, {backgroundColor: color, width : width? width : 160}]} onPress={()=>onPress()}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "600"
    },
    button: {
        backgroundColor: "#d9d9d9",
        borderRadius: 20,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    }
})