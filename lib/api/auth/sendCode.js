import axios from 'axios';
import { BASE_URL } from '../config.js';

export async function sendCode(mobile_number) {
    try {
        const response = await axios.post(`${BASE_URL}send-code`, {
            mobile_number
        });
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return {
            error: true,
            message: error.message
        };
    }
}