import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import getPlatform from './utils/Platform.js'
import Vid from './utils/Camera.js'
import GUI from './utils/Gui.js'

export default function App() {
  const [alg, setAlg] = useState('10101') //TODO: algorithm encoded based on "prescription"
  const [showGUI, setShowGUI] = useState(false)
  const platform = getPlatform()
  console.log(platform)
  const handleClick = () => {
    setAlg(alg + 1)
    console.log(alg)
    setShowGUI(!showGUI)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <div onClick={handleClick}>
        <Vid Algorithm={alg} Platform={platform} />
      </div>
      <div className="Interface" style={{ display: showGUI ? '' : 'none' }}>
        <GUI Disp={showGUI} Platform={platform} />
      </div>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
