import axios from "axios";
import { BASE_URL } from "../config.js";

export async function statusUser() {
  try {
    const response = await axios.post(`${BASE_URL}user/status`, {});
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
