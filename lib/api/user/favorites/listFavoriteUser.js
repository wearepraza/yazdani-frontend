import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../config.js'

export async function listFavoriteUser(payload = {}) {
  try {
    const token = Cookies.get('authToken')
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {}

    const response = await axios.post(
      `${BASE_URL}user/favorites/list`,
      payload,
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
