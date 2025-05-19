import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../config.js';

export async function removeCartItem(payload) {
    try {
        const response = await axios.post(`${BASE_URL}v1/user/cart/remove`, payload, {
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('authToken'),
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