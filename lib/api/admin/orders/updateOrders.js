import axios from "axios";
import { BASE_URL } from "../config.js";

export async function updateOrderStatus(
  order_id,
  status,
  payment_status = null
) {
  try {
    const payload = {
      order_id,
      status,
    };

    if (payment_status) {
      payload.payment_status = payment_status;
    }

    const response = await axios.post(
      `${BASE_URL}admin/orders/update-status`,
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
