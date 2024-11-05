import shopAPI from "../axios/configAxios";

const CART_ENDPOINTS = {
    GET_ALL_CART_ITEMS: "/carts",
    GET_CART_ITEM_BY_ID: "/carts/:id",
    GET_USER_CART: "/carts/user/:userId",
    ADD_TO_CART: "/carts",
    UPDATE_CART_ITEM: "/carts/:id",
    REMOVE_FROM_CART: "/carts/:id",
}

const cartApi = {
    getAllCartItems: async (loadingScreen = true) => {
        const res = await shopAPI.get(CART_ENDPOINTS.GET_ALL_CART_ITEMS);
        return res;
    },
    getCartItemById: async (id, loadingScreen = true) => {
        const res = await shopAPI.get(CART_ENDPOINTS.GET_CART_ITEM_BY_ID.replace(":id", id));
        return res;
    },

    getUserCart: async (userId, loadingScreen = true) => {
        const res = await shopAPI.get(CART_ENDPOINTS.GET_USER_CART.replace(":userId", userId));
        return res;
    },
     
    addToCart: async (cartData, loadingScreen = true) => {

        const res = await shopAPI.post(CART_ENDPOINTS.ADD_TO_CART, cartData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    
        return res;
    },
    updateCartItem: async (id, cartData, loadingScreen = true) => {
        const res = await shopAPI.put(CART_ENDPOINTS.UPDATE_CART_ITEM.replace(":id", id), cartData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    },
    removeFromCart: async (id, loadingScreen = true) => {
        const res = await shopAPI.delete(CART_ENDPOINTS.REMOVE_FROM_CART.replace(":id", id));

        return res;
    },
}

export default cartApi;