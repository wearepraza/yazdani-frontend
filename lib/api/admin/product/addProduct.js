import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config";

export async function createProduct(productData) {
    const {
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
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", category_id);
    formData.append("price", price);
    formData.append("discount_price", discount_price);
    formData.append("max_discount", max_discount);
    formData.append("inventory", inventory);
    formData.append("status", status);
    features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
    });

    if (image) {
        formData.append("image", image);
    }
    console.log("Bearer", Cookies.get("authToken"));

    try {
        const response = await axios.post(
            `${BASE_URL}admin/products/create`,
            formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + Cookies.get("authToken"),
                },
            }
        );
        return response.data;
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