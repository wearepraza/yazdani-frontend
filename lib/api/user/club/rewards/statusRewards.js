import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../config.js";

export async function statusRewards({

} = {}) {
    try {

        const token = Cookies.get("authToken");

        const response = await axios.post(`${BASE_URL}user/club/rewards/status`, {}, {
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