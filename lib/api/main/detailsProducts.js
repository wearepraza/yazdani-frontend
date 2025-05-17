import axios from "axios";
import { BASE_URL } from "../config.js";
import Cookies from "js-cookie";
export async function detailsProducts(product_id) {
    try {
        const response = await axios.post(`${BASE_URL}products/details`, { product_id }, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("authToken")}`
            }
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