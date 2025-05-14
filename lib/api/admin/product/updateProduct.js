import axios from 'axios';
import { BASE_URL } from '../../config';

export async function updateProduct(productData) {
    const {
        product_id,
        title,
        price,
        features,
        image
    } = productData;

    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('features', JSON.stringify(features));

    if (image) {
        formData.append('image', image);
    }

    try {
        const response = await axios.post(`${BASE_URL}admin/products/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
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