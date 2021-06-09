import React from 'react'
import { useEffect, useRef } from 'react'

const Vid = (props) => {
  const videoRef = useRef(null)
  const constraints = { video: true }

  useEffect(() => {
    getVideo(constraints)
  }, [videoRef])

  const getVideo = (constraints) => {
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
  return (
    <>
      <video ref={videoRef} />
      <canvas />
    </>
  )
}
export default Vid
