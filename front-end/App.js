import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Switch } from 'react-native'
import getPlatform from './utils/Platform.js'
import Vid from './components/Camera.js'
import MobileVid from './components/MobileCamera.js'
import Shift from './utils/Shift.js'

export default function App() {
	const [algorithm, setAlgorithm] = useState('0') //TODO: algorithm encoded based on "prescription"; currently stores each possible "prescription" in an array
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [showGUI, setShowGUI] = useState(false)
	const [camSwitch, setCamSwitch] = useState(false) // false = personal (front) camera; true = environment (back) camera
	const videoRef = useRef(null)
	const canvasRef = useRef(null)
	const algRef = useRef('0')
	const setAlgRef = (text) => {
		algRef.current = parseInt(text, 10)
	}
	useEffect(() => {
		getVideo(constraints)
	}, [videoRef])
	const platform = getPlatform()
	console.log(platform)

	const handleSubmit = (event) => {
		setShowGUI(!showGUI)
		event.preventDefault()
	}

	const handleClick = () => {
		console.log(algRef.current)
		setShowGUI(!showGUI)
	}

	const constraints = {
		video: {
			facingMode: 'environment',
			framerate: { ideal: 60, max: 120 },
			width: { ideal: 4096 },
			height: { ideal: 2160 }
			//kind of hacky but uses ideal to force the video to display in the camera's max resolution
		}
	}

	const getVideo = (constraints) => {
		navigator.mediaDevices.getUserMedia =
			navigator.mediaDevices.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.oGetUserMedia ||
			navigator.msGetUserMedia
		// for compatibility's sake, if navigator.mediaDevices.getUserMedia is not supported, try older versions
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then((stream) => {
				let video = videoRef.current
				video.srcObject = stream
				video.play()
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const Paint = () => {
		let video = videoRef.current
		let canvas = canvasRef.current
		let ctx = canvas.getContext('2d')
		const width = video.videoWidth
		const height = video.videoHeight
		canvas.width = width
		canvas.height = height

		return setInterval(() => {
			algRef.current = parseInt(algorithm)
			//let alg = parseInt(algorithm, 10)
			//let alg = parseInt(algRef.current, 10)
			let alg = algRef.current
			ctx.drawImage(video, 0, 0, width, height)
			let pixels = ctx.getImageData(0, 0, width, height)
			let l = pixels.data.length / 4
			for (var i = 0; i < l; i++) {
				const red = i * 4
				const green = i * 4 + 1
				const blue = i * 4 + 2
				const newColors = Shift[alg](
					pixels.data[red],
					pixels.data[green],
					pixels.data[blue]
				)
				pixels.data[red] = newColors[0]
				pixels.data[blue] = newColors[2]
				pixels.data[green] = newColors[1]
			}

			ctx.putImageData(pixels, 0, 0)
		}, 1 / video.framerate)
	}

	const Shift = [
		function subShift(red, green, blue) {
			if (red - green > 30 && red - blue > 30) {
				red = 0
				green = green
				blue = blue < 205 ? blue + 50 : 255
			}
			return [red, green, blue]
		},
		function subShift(red, green, blue) {
			green = green
			blue = 0
			red = 200
			return [red, green, blue]
		}
	]

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
					<TextInput
						autoCorrect={false}
						ref={algRef}
						//value={algRef.current}
						//onChangeText={setAlgRef}
						value={algorithm}
						onChangeText={setAlgorithm}
					/>
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
				<View>
					<video
						ref={videoRef}
						onCanPlay={() => Paint()}
						style={
							{ display: 'none' } //extremely inefficient! TODO: find a way around this
						}
					/>
					<canvas ref={canvasRef} />
				</View>
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
