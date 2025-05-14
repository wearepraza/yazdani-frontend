import axios from 'axios';
import { BASE_URL } from '../config.js';

export async function updateCategories(category_id,name, parent_id) {
  try {
    const response = await axios.post(`${BASE_URL}admin/categories/update`, {
      category_id,
      name,
      parent_id,
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