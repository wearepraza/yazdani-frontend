import axios from "axios";
import { BASE_URL } from "../config.js";
import Cookie from "js-cookie";
export async function searchProducts(query, per_page) {
    try {
        const response = await axios.post(
            `${BASE_URL}products/search`, { query, per_page }, {
                headers: {
                    Authorization: `Bearer ${Cookie.get("authToken")}`,
                },
            }
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