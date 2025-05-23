import axios from 'axios';
import { BASE_URL } from '../../config';
import Cookies from 'js-cookie';
export async function updateProduct(productData) {
    const {
        product_id,
        title,
        description,
        category_id,
        price,
        discount_price,
        max_discount,
        inventory,
        status,
        features,
        image,
    } = productData;

    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category_id', category_id);
    formData.append('price', price);
    formData.append('discount_price', discount_price);
    formData.append('max_discount', max_discount);
    formData.append('inventory', inventory);
    formData.append('status', status);

    features.forEach((feature) => {
        formData.append('features[]', feature);
    });

    if (image) {
        formData.append('image', image);
    }

    try {
        const response = await axios.post(`${BASE_URL}admin/products/update`, formData, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('authToken')}`,
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