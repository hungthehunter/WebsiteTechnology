import shopAPI from "../axios/configAxios";

const DECENTRALIZATION_ENDPOINTS = {
    GET_ALL_REVIEW:"/decentralizations",
    GET_REVIEW_BY_ID:"/decentralizations/:id",
    CREATE_REVIEW:"/decentralizations",
    UPDATE_REVIEW:"/decentralizations/:id",
    DELETE_REVIEW:"/decentralizations/:id",
}


const decentralizationApi = {
getAllDecentralization: async (loadingScreen=true) => {
    const res = await shopAPI.get(DECENTRALIZATION_ENDPOINTS.GET_ALL_REVIEW);
    if(loadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
getDecentralizationById: async (id,LoadingScreen=true) => {
    const res = await shopAPI.get(DECENTRALIZATION_ENDPOINTS.GET_REVIEW_BY_ID.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state) => setTimeout(state,2000));
    }
    return res;
},
createDecentralization: async (promotionData,LoadingScreen=true) => {
    const res = await shopAPI.post(DECENTRALIZATION_ENDPOINTS.CREATE_REVIEW, promotionData ,
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
updateDecentralization: async (id,promotionData,LoadingScreen=true) => {
    const res = await shopAPI.put(DECENTRALIZATION_ENDPOINTS.UPDATE_REVIEW.replace(":id",id), promotionData ,
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
deleteDecentralization: async(id,LoadingScreen) => {
    const res = await shopAPI.delete(DECENTRALIZATION_ENDPOINTS.DELETE_REVIEW.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
}

export default decentralizationApi