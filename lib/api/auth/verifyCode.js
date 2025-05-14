import axios from 'axios';
import { BASE_URL } from '../config.js';

export async function verifyCode(mobile_number, code) {
    try {
        const response = await axios.post(`${BASE_URL}verify-code`, {
            mobile_number,
            code
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