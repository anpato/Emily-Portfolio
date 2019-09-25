import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export const Spinner = ({ color }) => {
  return (
    <div>
      <Loader type='ThreeDots' color={color} height={40} width={40}/>
    </div>
  )
}