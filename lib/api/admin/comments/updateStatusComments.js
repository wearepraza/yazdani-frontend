import axios from 'axios';
import { BASE_URL } from '../../config.js';

export async function updateCommentStatus(comment_id, status) {
  try {
    const response = await axios.post(`${BASE_URL}admin/comments/update-status`, {
      comment_id,
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