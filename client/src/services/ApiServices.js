import Axios from 'axios'
const JwtToken = 'token'
const BASEURL = 'http://localhost:3001'

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
		await setUser(resp.data.user._id, resp.data.token)
		return { status: resp.status }
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

export const getProjects =async  () => {
  try {
    const resp = await Api.get('projects')
    return resp.data
  } catch (error) {
    throw error
  }
}

export const getCarouselImages = () => {
  try {
    const resp = await Api.get('/projects/?carousel')
    return resp.data
  } catch (error) {
    throw error
  }
}
