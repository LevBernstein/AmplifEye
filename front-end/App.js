import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import getPlatform from './utils/Platform.js'
import Vid from './components/Camera.js'

export default function App() {
  const [alg, setAlg] = useState('10') //TODO: algorithm encoded based on "prescription"
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showGUI, setShowGUI] = useState(false)
  const platform = getPlatform()
  console.log(platform)

  const handleSubmit = (event) => {
    setShowGUI(!showGUI)
    event.preventDefault()
  }

  const handleClick = () => {
    console.log(alg)
    setShowGUI(!showGUI)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <div className="Interface" style={{ display: showGUI ? '' : 'none' }}>
        {!showGUI ? (
          <></>
        ) : (
          <form id="guiForm" onSubmit={handleSubmit}>
            <label className="guiLabel"> Email: </label>
            <input
              className="Email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label className="guiLabel"> Password: </label>
            <input
              className="Password"
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label className="guiLabel"> Algorithm: </label>
            <input
              className="inputs"
              type="text"
              id="alg"
              name="alg"
              value={alg}
              onChange={(e) => setAlg(e.target.value)}
            />
            <br />
            <button type="submit" className="profButton" form="guiForm">
              Save
            </button>
          </form>
        )}
      </div>
      <div
        className="Video"
        onClick={handleClick}
        style={{ display: showGUI ? 'none' : '' }}>
        <Vid disp={showGUI} Algorithm={alg} Platform={platform} />
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
