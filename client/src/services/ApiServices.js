import Axios from 'axios'
const JwtToken = 'token'
const BASE_URL =
	window.location.hostname === 'localhost'
		? 'http://localhost:3001'
		: process.env.REACT_APP_PRODUCTION
const Api = Axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${JwtToken}`,
		'Access-Control-Allow-Origin': '*'
	}
})

export const loginUser = async (data) => {
	try {
		const resp = await Api.post('/auth/login', data)
		await localStorage.setItem('token', resp.data.token)
		await localStorage.setItem('userId', resp.data.user._id)
		return { status: resp.status, token: resp.data.token }
	} catch (error) {
		throw error
	}
}

export const signUpUser = async (data) => {
	try {
		const resp = await Api.post('/auth/signup', data)
		return resp.status
	} catch (error) {
		throw error
	}
}

export const logOutUser = async () => {
	await localStorage.clear()
	const resp = { status: 200 }
	return resp
}

export const getProjects = async () => {
	try {
		const resp = await Api.get('/projects')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getProject = async (id) => {
	try {
		const resp = await Api.get(`/projects/${id}`)
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getCarouselImages = async () => {
	try {
		const resp = await Api.get('/projects/?carousel')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const uploadProject = async (data) => {
	try {
		const resp = await Api.post('/projects', data)
		return resp.status
	} catch (error) {
		throw error
	}
}
export const updateProject = async (id, data) => {
	try {
		const resp = await Api.put(`/projects/${id}`, data)
		return resp.status
	} catch (error) {
		throw error
	}
}

export const deleteProject = async (id) => {
	try {
		const resp = await Api.delete(`/projects/${id}`)
		return resp.status
	} catch (error) {
		throw error
	}
}
