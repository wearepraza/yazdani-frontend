import axios from 'axios';
import { BASE_URL } from '../../config.js';

export async function listUsers({ status = null, search = null, per_page = null } = {}) {
  try {
    const payload = {};

    if (status) payload.status = status;
    if (search) payload.search = search;
    if (per_page) payload.per_page = per_page;

    const response = await axios.post(`${BASE_URL}admin/users/list`, payload);
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
