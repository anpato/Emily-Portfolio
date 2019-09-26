import React from 'react'
import Burger from '@animated-burgers/burger-squeeze'
import '@animated-burgers/burger-squeeze/dist/styles.css'

export const Hamburger = ({ isOpen, onClick }) => {
  return (
    <div className='burger-btn' onClick={onClick}><Burger isOpen={isOpen} /></div>
  )
}