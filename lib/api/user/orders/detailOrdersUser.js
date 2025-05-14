import axios from 'axios';
import { BASE_URL } from '../../config.js';

export async function detailOrdersUser(order_id) {
  try {
    const response = await axios.post(`${BASE_URL}user/orders/details`, {
      
      order_id
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
