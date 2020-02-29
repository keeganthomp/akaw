import axios from 'axios'
import { PROFILE_API_URL } from './constants'

const makeProfileRequest = ({ method, body = null, endpoint }) => {
	const finalUrl = PROFILE_API_URL + endpoint
	return axios({
			method,
			url: finalUrl,
			data: body
	})
}

export const updateProfile = ({ userId, profile }) => {
	return makeProfileRequest({
			endpoint: `/`,
			method: 'PUT',
			body: {
					userId,
					profile
			}
	})
}
