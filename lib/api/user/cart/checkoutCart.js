import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../config.js';

export async function checkoutCart(payload) {
    try {
        const response = await axios.post(`${BASE_URL}user/cart/checkout`, payload, {
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