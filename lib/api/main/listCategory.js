import axios from "axios";
import { BASE_URL } from "../config.js";

export async function listCategory() {
  try {
    const response = await axios.post(`${BASE_URL}categories/list`, {});
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
