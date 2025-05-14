import axios from 'axios';
import { BASE_URL } from '../../config.js';

export async function deleteFavoriteUser(product_id) {
  try {
    const response = await axios.post(`${BASE_URL}user/favorites/remove`, {
      product_id,
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
