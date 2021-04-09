import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import VideoLogic from './VideoLogic'
import View from './View'

const Root = () => {
  return (
    <VideoLogic>
      <View />
    </VideoLogic>
  )
}

export default Root
