import axios from 'axios';
import { BASE_URL } from '../../config.js';

export async function detailsUsers(user_id) {
  try {
    const response = await axios.post(`${BASE_URL}admin/users/details`, {
      user_id
    });
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
