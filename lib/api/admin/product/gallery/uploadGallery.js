import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../config.js";



export async function uploadGallery(product_id, image, label) {
    try {
        const token = Cookies.get("authToken");
        const formData = new FormData();

        formData.append('product_id', product_id);
        formData.append('image', image);
        formData.append('label', label);

        const response = await axios.post(
            `${BASE_URL}admin/products/gallery/upload`,
            formData, {
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'multipart/form-data',
                },
            }
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