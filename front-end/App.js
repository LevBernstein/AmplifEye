import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	SafeAreaView
} from 'react-native'
import getPlatform from './utils/Platform.js'
import Vid from './components/Camera.js'

export default function App() {
	const [alg, setAlg] = useState('0') //TODO: algorithm encoded based on "prescription", re-render video with changed alg.
	//Need to force an update of Vid or find a more elegant solution
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
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
				<Text>{'\n'}</Text>
				<Button title="Save" onPress={(e) => handleSubmit(e)} />
			</View>
			<View
				className="Video"
				onClick={handleClick}
				style={{ display: showGUI ? 'none' : '' }}>
				<Vid disp={showGUI} Algorithm={alg} Platform={platform} />
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
