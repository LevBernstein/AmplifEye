import React from 'react'
import { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'

const Vid = (props) => {
  const videoRef = useRef(null)
  const photoRef = useRef(null)
  const constraints = { video: { facingMode: 'environment' } }
  // TODO: method to change constraints facingMode: user or environment
  useEffect(() => {
    getVideo(constraints)
  }, [videoRef])

  const getVideo = (constraints) => {
    navigator.mediaDevices.getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.oGetUserMedia ||
      navigator.msGetUserMedia
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch((err) => {
        console.log(err.name)
      })
  }

  const paint = () => {
    let video = videoRef.current
    let photo = photoRef.current
    let ctx = photo.getContext('2d')
    const width = window.screen.width
    const height = window.screen.height
    photo.width = width
    photo.height = height
    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height)
      //let pixels = ctx.getImageData(0, 0, width, height)
    }, 33) //interval of 33 = 60 fps, good baseline
  }

  return (
    <div>
      <video
        onCanPlay={() => paint()}
        ref={videoRef}
        style={
          { display: 'none' } /*extremely inefficient, find a way around this*/
        }
      />
      <canvas ref={photoRef} />
    </div>
  )
}

export default Vid
