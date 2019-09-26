import React from 'react'
import { Link } from 'react-router-dom'
export const Button = ({ className, onClick, path, title }) => (
	<Link to={path} className={className} onClick={onClick}>
		{title}
	</Link>
)
