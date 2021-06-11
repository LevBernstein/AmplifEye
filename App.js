import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useRef } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Vid from './utils/Camera.js'
import GUI from './utils/Gui.js'

export default function App() {
  const algRef = useRef('101001') //TODO: algorithm encoded based on "prescription"

  return (
    <View style={styles.container}>
      <Text style={styles.Text}></Text>
      <StatusBar style="auto" />
      <div onClick={GUI}>
        <Vid style={{ display: 'block' }} Algorithm={algRef.current} />
      </div>
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
