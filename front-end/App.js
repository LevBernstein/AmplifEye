import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import getPlatform from './utils/Platform.js'
import Vid from './components/Camera.js'

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

  const GUI = (props) => {
    if (!props.Disp) {
      return <></>
    }
    return (
      <>
        <h1>j</h1> <p>e</p>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <div className="Interface" style={{ display: showGUI ? '' : 'none' }}>
        <GUI Disp={showGUI} Platform={platform} />
      </div>
      <div
        className="Video"
        onClick={handleClick}
        Disp={showGUI}
        style={{ display: showGUI ? 'none' : '' }}>
        <Vid Algorithm={alg} Platform={platform} />
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
