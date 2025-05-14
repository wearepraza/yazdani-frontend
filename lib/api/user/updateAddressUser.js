import axios from 'axios';
import { BASE_URL } from '../config.js';

export async function updateAddress(address_id = null, title, address_line, postal_code) {
  try {
    const payload = {
      title,
      address_line,
      postal_code
    };

    if (address_id) {
      payload.address_id = address_id;
    }

    const response = await axios.post(`${BASE_URL}user/update-address`, payload);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return {
      error: true,
      message: error.message,
    };
  }
}