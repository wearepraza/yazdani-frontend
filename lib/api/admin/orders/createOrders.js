import axios from 'axios';
import { BASE_URL } from '../../config.js';

export async function createOrders(user_id, items) {
  try {
    const response = await axios.post(`${BASE_URL}admin/orders/submit`, {
      user_id,
      items
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
