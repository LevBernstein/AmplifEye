import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Switch } from 'react-native'
import getPlatform from './utils/Platform.js'
import Vid from './components/Camera.js'
import MobileVid from './components/MobileCamera.js'

export default function App() {
	const [alg, setAlg] = useState('0') //TODO: algorithm encoded based on "prescription", re-render video with changed alg.
	//Need to force an update of Vid or find a more elegant solution
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [showGUI, setShowGUI] = useState(false)
	const [camSwitch, setCamSwitch] = useState(false) // false = personal (front) camera; true = environment (back) camera
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
			<View style={{ display: showGUI ? '' : 'none' }}>
				<View>
					<Text>{'\n'}Email: </Text>
					<TextInput
						autoCompleteType="email"
						autoCorrect={false}
						autoFocus={true}
						textContentType="emailAddress"
						placeholder="name@address.com"
						value={email}
						onChangeText={setEmail}
					/>
				</View>
				<View>
					<Text>{'\n'}Password: </Text>
					<TextInput
						autoCompleteType="password"
						autoCorrect={false}
						textContentType="password"
						secureTextEntry={true}
						placeholder="*******"
						value={pass}
						onChangeText={setPass}
					/>
				</View>
				<View>
					<Text>{'\n'}Algorithm: </Text>
					<TextInput autoCorrect={false} value={alg} onChangeText={setAlg} />
				</View>
				<View style={{ display: platform === 'Mobile' ? '' : 'none' }}>
					<Text>{'\n'}Camera: </Text>
					<Switch
						trackColor={{ false: '#FF0000', true: '#00FF00' }}
						thumbColor={camSwitch ? '#000000' : '#FFFFFF'}
						ios_backgroundColor="#3e3e3e"
						onValueChange={setCamSwitch}
						value={camSwitch}
					/>
				</View>
				<Text>{'\n'}</Text>
				<Button title="Save" onPress={(e) => handleSubmit(e)} />
			</View>
			<View
				className="Video"
				onClick={handleClick}
				style={{ display: showGUI ? 'none' : '' }}>
				{platform !== 'Mobile' ? (
					<Vid Algorithm={alg} />
				) : (
					<MobileVid Algorithm={alg} useCam={camSwitch} />
				)}
			</View>
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
