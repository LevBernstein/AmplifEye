import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Vid from './Camera.js'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}></Text>
      <StatusBar style="auto" />
      <Vid />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    color: '#000000',
    fontSize: '1.5em'
  }
})
