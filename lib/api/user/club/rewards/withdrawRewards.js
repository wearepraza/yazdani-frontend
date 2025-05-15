import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../config.js";

export async function withdrawRewards({
    amount,
    type_method,
    iban,
} = {}) {
    try {

        const token = Cookies.get("authToken");

        const response = await axios.post(`${BASE_URL}user/club/rewards/withdraw`, {
            amount,
            type_method,
            ...(iban && { iban }),
        }, {
            headers: {
                Authorization: "Bearer " + token,
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