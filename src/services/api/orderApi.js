import shopAPI from "../axios/configAxios";

const ORDER_ENDPOINTS = {
    GET_ALL_ORDER:"/orders",
    GET_ORDER_BY_ID:"/orders/:id",
    CREATE_ORDER:"/orders",
    UPDATE_ORDER:"/orders/:id",
    DELETE_ORDER:"/orders/:id",
}


const orderApi = {
getAllOrder: async (loadingScreen=true) => {
    const res = await shopAPI.get(ORDER_ENDPOINTS.GET_ALL_ORDER);
    if(loadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
getOrderById: async (id,LoadingScreen=true) => {
    const res = await shopAPI.get(ORDER_ENDPOINTS.GET_ORDER_BY_ID.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state) => setTimeout(state,2000));
    }
    return res;
},
createOrder: async (formData, LoadingScreen = true) => {
    const res = await shopAPI.post(ORDER_ENDPOINTS.CREATE_ORDER, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (LoadingScreen) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    return res;
},


updateOrder: async (id,orderData,LoadingScreen=true) => {
    const res = await shopAPI.put(ORDER_ENDPOINTS.UPDATE_ORDER.replace(":id",id), orderData ,
{
    headers:{
        'Content-Type': 'multipart/form-data',
    }
}
)
if(LoadingScreen){
    await new Promise((state)=>setTimeout(state,2000));
}
return res;
},
deleteOrder: async(id,LoadingScreen) => {
    const res = await shopAPI.delete(ORDER_ENDPOINTS.DELETE_ORDER.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
}

export default orderApi