import shopAPI from "../axios/configAxios";

const DECENTRALIZATION_ENDPOINTS = {
    GET_ALL_DECENTRALIZATION:"/decentralizations",
    GET_DECENTRALIZATION_BY_ID:"/decentralizations/:id",
    CREATE_DECENTRALIZATION:"/decentralizations",
    UPDATE_DECENTRALIZATION:"/decentralizations/:id",
    DELETE_DECENTRALIZATION:"/decentralizations/:id",
}


const decentralizationApi = {
getAllDecentralization: async (loadingScreen=true) => {
    const res = await shopAPI.get(DECENTRALIZATION_ENDPOINTS.GET_ALL_DECENTRALIZATION);
    if(loadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
getDecentralizationById: async (id,LoadingScreen=true) => {
    const res = await shopAPI.get(DECENTRALIZATION_ENDPOINTS.GET_DECENTRALIZATION_BY_ID.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state) => setTimeout(state,2000));
    }
    return res;
},
createDecentralization: async (promotionData,LoadingScreen=true) => {
    const res = await shopAPI.post(DECENTRALIZATION_ENDPOINTS.CREATE_DECENTRALIZATION, promotionData ,
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
updateDecentralization: async (id,decentralizationData,LoadingScreen=true) => {
    const res = await shopAPI.put(DECENTRALIZATION_ENDPOINTS.UPDATE_DECENTRALIZATION.replace(":id",id), decentralizationData ,
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
    const res = await shopAPI.delete(DECENTRALIZATION_ENDPOINTS.DELETE_DECENTRALIZATION.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
}

export default decentralizationApi