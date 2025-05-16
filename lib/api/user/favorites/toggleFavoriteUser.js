import axios from 'axios';
import { BASE_URL } from '../../config.js';
import Cookies from 'js-cookie';

export async function toggleFavoriteUser(product_id) {
    try {
        const response = await axios.post(`${BASE_URL}user/favorites/toggle`, {
            product_id,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
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