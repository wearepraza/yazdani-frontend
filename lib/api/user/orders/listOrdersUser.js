import axios from "axios";
import { BASE_URL } from "../../config.js";
import Cookies from "js-cookie";

export async function listOrdersUser({
    search = null,
    status = null,
    per_page = 10,
} = {}) {
    try {
        const payload = {};

        if (search) payload.search = search;
        if (status) payload.status = status;
        if (per_page) payload.per_page = per_page;

        const response = await axios.post(`${BASE_URL}user/orders/list`, payload, {
            headers: {
                Authorization: "Bearer " + Cookies.get("authToken"),
            },
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