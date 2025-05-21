import axios from "axios";
import { BASE_URL } from "../../config.js";
import Cookie from "js-cookie";
export async function overviewDashboard() {
    try {
        const response = await axios.post(
            `${BASE_URL}admin/dashboard/overview`, {}, {
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