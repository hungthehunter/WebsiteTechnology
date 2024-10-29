import shopAPI from "../axios/configAxios";

const PROMOTION_ENDPOINTS = {
    GET_ALL_REVIEW:"/promotions",
    GET_REVIEW_BY_ID:"/promotions/:id",
    CREATE_REVIEW:"/promotions",
    UPDATE_REVIEW:"/promotions/:id",
    DELETE_REVIEW:"/promotions/:id",
}


const promotionApi = {
getAllPromotion: async (loadingScreen=true) => {
    const res = await shopAPI.get(PROMOTION_ENDPOINTS.GET_ALL_REVIEW);
    if(loadingScreen){
        await new  Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
getPromotionById: async (id,LoadingScreen=true) => {
    const res = await shopAPI.get(PROMOTION_ENDPOINTS.GET_REVIEW_BY_ID.replace(":id",id));
    if(LoadingScreen){
        await new  Promise((state) => setTimeout(state,2000));
    }
    return res;
},
createPromotion: async (promotionData,LoadingScreen=true) => {
    const res = await shopAPI.post(PROMOTION_ENDPOINTS.CREATE_REVIEW, promotionData ,
        {
            header:{
            'Content-type':'application/json',
            }
        }
    )
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
updatePromotion: async (id,promotionData,LoadingScreen=true) => {
    const res = await shopAPI.put(PROMOTION_ENDPOINTS.UPDATE_REVIEW.replace(":id",id), promotionData ,
{
    headers:{
        'Content-Type':'application/json',
    }
}
)
if(LoadingScreen){
    await new Promise((state)=>setTimeout(state,2000));
}
return res;
},
deleteProduct: async(id,LoadingScreen) => {
    const res = await shopAPI.delete(PROMOTION_ENDPOINTS.DELETE_REVIEW.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
}

export default promotionApi