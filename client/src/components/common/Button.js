import React from 'react'
import { Link } from 'react-router-dom'
export const Button = ({ className, path, title }) => (
	<Link to={path} className={className}>
		{title}
	</Link>
)
