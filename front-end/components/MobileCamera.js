import React from 'react'
import { useEffect, useState, useRef } from 'react'
import Shift from '../utils/Shift.js'
import { View, Text } from 'react-native'
import { Video, AVPlaybackStatus } from 'expo-av'
import { Camera } from 'expo-camera'

const MobileVid = (props) => {
	const Algorithm = parseInt(props.Algorithm, 10)
	console.log('Algorithm: ' + Algorithm)
	console.log('Camera use: ' + props.useCam)
	const [hasPermission, setHasPermission] = useState(null)

	useEffect(() => {
		;(async () => {
			const { status } = await Camera.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	if (hasPermission === null) {
		return <View />
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}

	return (
		<View>
			<Camera //throws an error on Firefox on laptop running Debian.
				//Need access to mobile devices in order to test.
				type={
					props.useCam
						? Camera.Constants.Type.front
						: Camera.Constants.Type.back
				}
			/>
			<Text>e</Text>
		</View>
	)
}

export default MobileVid
