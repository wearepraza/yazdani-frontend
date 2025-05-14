import axios from "axios";
import { BASE_URL } from "../../config.js";

export async function createReward(
  reward_id,

  title,
  description,
  required_points,
  is_active
) {
  try {
    const response = await axios.post(`${BASE_URL}admin/rewards/update`, {
      reward_id,
      title,
      description,
      required_points,
      is_active,
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
