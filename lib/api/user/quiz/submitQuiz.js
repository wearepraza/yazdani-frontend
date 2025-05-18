import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config.js";

export async function submitQuiz(quiz_id, selected_option) {
    try {
        const token = Cookies.get("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.post(
            `${BASE_URL}user/quiz/submit`, {
                quiz_id,
                selected_option
            }, { headers }
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