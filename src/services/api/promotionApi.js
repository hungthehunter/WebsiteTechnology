import shopAPI from "../axios/configAxios";

const PROMOTION_ENDPOINTS = {
    GET_ALL_PROMOTION:"/promotions",
    GET_PROMOTION_BY_ID:"/promotions/:id",
    CREATE_PROMOTION:"/promotions",
    UPDATE_PROMOTION:"/promotions/:id",
    DELETE_PROMOTION:"/promotions/:id",
}


const promotionApi = {
getAllPromotions: async (loadingScreen=true) => {
    const res = await shopAPI.get(PROMOTION_ENDPOINTS.GET_ALL_PROMOTION);
    if(loadingScreen){
        await new  Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
getPromotionById: async (id,LoadingScreen=true) => {
    const res = await shopAPI.get(PROMOTION_ENDPOINTS.GET_PROMOTION_BY_ID.replace(":id",id));
    if(LoadingScreen){
        await new  Promise((state) => setTimeout(state,2000));
    }
    return res;
},
createPromotion: async (promotionData,LoadingScreen=true) => {
    const res = await shopAPI.post(PROMOTION_ENDPOINTS.CREATE_PROMOTION, promotionData ,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        }
    )
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
updatePromotion: async (id,promotionData,LoadingScreen=true) => {
    const res = await shopAPI.put(PROMOTION_ENDPOINTS.UPDATE_PROMOTION.replace(":id",id), promotionData ,
{
    headers: {
        'Content-Type': 'multipart/form-data'
      }
}
)
if(LoadingScreen){
    await new Promise((state)=>setTimeout(state,2000));
}
return res;
},
deletePromotion: async(id,LoadingScreen) => {
    const res = await shopAPI.delete(PROMOTION_ENDPOINTS.DELETE_PROMOTION.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
}

export default promotionApi