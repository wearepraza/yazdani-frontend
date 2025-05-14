import axios from 'axios';
import { BASE_URL } from '../config.js';

export async function register(mobile_number, name, surname, password, invitation_code) {
    try {
        const response = await axios.post(`${BASE_URL}register`, {
            mobile_number,
            name,
            surname,
            password,
            invitation_code
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