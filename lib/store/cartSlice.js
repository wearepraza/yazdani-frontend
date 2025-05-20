import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.product_id === newItem.product_id);

            if (existingItem) {
                existingItem.quantity = newItem.quantity || existingItem.quantity + 1;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: newItem.quantity || 1
                });
            }

            state.totalQuantity = state.items.reduce((total, item) => total + (item.quantity || 0), 0);
            state.totalAmount = state.items.reduce((total, item) => {
                const price = item.product ? .discount_price || item.product ? .price || 0;
                const quantity = item.quantity || 0;
                return total + (price * quantity);
            }, 0);
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.product_id === id);

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.product_id !== id);
                } else {
                    existingItem.quantity -= 1;
                }
            }

            state.totalQuantity = state.items.reduce((total, item) => total + (item.quantity || 0), 0);
            state.totalAmount = state.items.reduce((total, item) => {
                const price = item.product ? .discount_price || item.product ? .price || 0;
                const quantity = item.quantity || 0;
                return total + (price * quantity);
            }, 0);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },

        setCart: (state, action) => {
            state.items = action.payload;
            state.totalQuantity = state.items.reduce((total, item) => total + (item.quantity || 0), 0);
            state.totalAmount = state.items.reduce((total, item) => {
                const price = item.product ? .discount_price || item.product ? .price || 0;
                const quantity = item.quantity || 0;
                return total + (price * quantity);
            }, 0);
        }
    },
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;