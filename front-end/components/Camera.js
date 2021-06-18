import React from 'react'
import { useEffect, useState, useRef, useCallback } from 'react'
import Shift from '../utils/Shift.js'
import { View } from 'react-native'
import { Video, AVPlaybackStatus } from 'expo-av'
import { Camera } from 'expo-camera'

const Vid = (props) => {
	const Algorithm = parseInt(props.Algorithm, 10)
	const Plat = props.Platform
	console.log('Algorithm: ' + Algorithm)
	console.log('Camera use: ' + props.useCam)

	if (Plat != 'Mobile') {
		//Web
		const constraints = {
			video: {
				facingMode: 'environment',
				framerate: { ideal: 60, max: 120 },
				width: { ideal: 4096 },
				height: { ideal: 2160 } //kind of hacky but uses ideal to force the video to display in the camera's max resolution
			}
		}
		const videoRef = useRef(null)
		const photoRef = useRef(null)
		useEffect(() => {
			getVideo(constraints)
		}, [videoRef])

		const getVideo = (constraints) => {
			navigator.mediaDevices.getUserMedia =
				navigator.mediaDevices.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.oGetUserMedia ||
				navigator.msGetUserMedia // for compatibility's sake, if navigator.mediaDevices.getUserMedia is not supported, try older versions
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

		const Paint = (alg) => {
			let video = videoRef.current
			let photo = photoRef.current
			let ctx = photo.getContext('2d')
			const width = video.videoWidth
			const height = video.videoHeight
			photo.width = width
			photo.height = height

			return setInterval(() => {
				ctx.drawImage(video, 0, 0, width, height)
				let pixels = ctx.getImageData(0, 0, width, height)
				let l = pixels.data.length / 4
				for (var i = 0; i < l; i++) {
					const red = i * 4
					const green = i * 4 + 1
					const blue = i * 4 + 2
					let newColors = Shift(
						alg,
						pixels.data[red],
						pixels.data[green],
						pixels.data[blue]
					)
					pixels.data[red] = newColors[0]
					pixels.data[green] = newColors[1]
					pixels.data[blue] = newColors[2]
				}

				ctx.putImageData(pixels, 0, 0)
			}, 1 / video.framerate) //interval of 16 = 60 fps, good baseline
		}

		return (
			<View>
				<video
					ref={videoRef}
					onCanPlay={() => Paint(Algorithm)}
					style={
						{ display: 'none' } //extremely inefficient! TODO: find a way around this
					}
				/>
				<canvas ref={photoRef} />
			</View>
		)
	} else {
		//Mobile:
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
				<Camera
					type={
						props.useCam
							? Camera.Constants.Type.front
							: Camera.Constants.Type.back
					}></Camera>
			</View>
		)
	}
}

export default Vid
