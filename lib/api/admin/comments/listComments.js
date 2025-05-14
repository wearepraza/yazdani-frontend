import axios from "axios";
import { BASE_URL } from "../../config.js";

export async function listComments({ status = null, per_page = 10 } = {}) {
  try {
    const payload = {};

    if (status) payload.status = status;
    if (per_page) payload.per_page = per_page;

    const response = await axios.post(
      `${BASE_URL}admin/comments/list`,
      payload
    );
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
