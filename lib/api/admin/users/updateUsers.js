import axios from 'axios';
import { BASE_URL } from '../../config.js';

export async function updateUserStatus(user_id, status) {
  try {
    const response = await axios.post(`${BASE_URL}admin/users/update-status`, {
      user_id,
      status
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