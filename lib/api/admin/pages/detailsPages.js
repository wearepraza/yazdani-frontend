import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../config.js';

export async function detailsPages(slug) {
    try {
        const response = await axios.post(`${BASE_URL}admin/pages/details`, { slug }, {
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