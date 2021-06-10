import React from 'react'
import { useEffect, useRef } from 'react'

const Vid = (props) => {
  const videoRef = useRef(null)
  const photoRef = useRef(null)
  const constraints = {
    video: {
      facingMode: 'environment',
      framerate: { ideal: 60, max: 120 },
      width: { ideal: 4096 },
      height: { ideal: 2160 } //kind of hacky but uses ideal to force the video to display in the camera's max resolution
    }
  }
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
      navigator.msGetUserMedia // for compatibility's sake, if navigator.mediaDevices.getUserMedia is not supported, try older versions
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
    const width = video.videoWidth
    const height = video.videoHeight
    photo.width = width
    photo.height = height

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height)
      let pixels = ctx.getImageData(0, 0, width, height)
      let l = pixels.data.length / 4
      for (var i = 0; i < l; i++) {
        if (
          pixels.data[i * 4] - pixels.data[i * 4 + 1] > 30 &&
          pixels.data[i * 4] - pixels.data[i * 4 + 2] > 30
        ) {
          pixels.data[i * 4] = 0
          pixels.data[i * 4 + 1] = pixels.data[i * 4 + 1]
          pixels.data[i * 4 + 2] =
            pixels.data[i * 4 + 2] < 205 ? pixels.data[i * 4 + 2] + 50 : 255
        }
      }

      ctx.putImageData(pixels, 0, 0)
    }, 1 / video.framerate) //interval of 16 = 60 fps, good baseline
  }

  return (
    <div>
      <video
        onCanPlay={() => paint()}
        ref={videoRef}
        style={
          { display: 'none' } //extremely inefficient! TODO: find a way around this
        }
      />
      <canvas ref={photoRef} />
    </div>
  )
}

export default Vid
