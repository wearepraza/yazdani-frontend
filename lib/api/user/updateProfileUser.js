import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '../config.js'

export async function updateProfile(name, surname, email) {
  try {
    const token = Cookies.get('authToken')
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {}

    const response = await axios.post(
      `${BASE_URL}user/update-profile`,
      { name, surname, email },
      { headers }
    )

    return response
  } catch (error) {
    if (error.response) {
      return error.response.data
    }
    return {
      error: true,
      message: error.message,
    }
  }
}
