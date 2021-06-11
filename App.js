import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Vid from './utils/Camera.js'
import GUI from './utils/Gui.js'

export default function App() {
  const algRef = useRef('101001') //TODO: algorithm encoded based on "prescription"
  const [showGUI, setShowGUI] = useState(true)

  const handleClick = () => {
    algRef.current += 1
    console.log(algRef.current)
    setShowGUI(!showGUI)
  }

  useEffect(() => {
    handleClick()
  }, [algRef])

  return (
    <View style={styles.container}>
      <Text style={styles.Text}></Text>
      <StatusBar style="auto" />
      <div onClick={handleClick}>
        <Vid style={{ display: 'block' }} Algorithm={algRef.current} />
      </div>
      <div className="Interface">
        <GUI disp={showGUI} />
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
  },
  Text: {
    color: '#000000',
    fontSize: '1.5em'
  }
})
