import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '../config.js'

export async function updateAddress(address_id = null, title, address_line, postal_code) {
  try {
    const token = Cookies.get('authToken')
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {}

    const payload = { title, address_line, postal_code }
    if (address_id) {
      payload.address_id = address_id
    }

    const response = await axios.post(
      `${BASE_URL}user/update-address`,
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
