import shopAPI from "../axios/configAxios";

const PURCHASE_HISTORY_ENDPOINTS = {
    GET_ALL_PURCHASEHISTORY:"/purchasehistorys",
    GET_PURCHASEHISTORY_BY_ID:"/purchasehistorys/:id",
    CREATE_PURCHASEHISTORY:"/purchasehistorys",
    UPDATE_PURCHASEHISTORY:"/purchasehistorys/:id",
    DELETE_PURCHASEHISTORY:"/purchasehistorys/:id",
}


const purchaseHistoryApi = {
getAllPurchaseHistory: async (loadingScreen=true) => {
    const res = await shopAPI.get(PURCHASE_HISTORY_ENDPOINTS.GET_ALL_PURCHASEHISTORY);
    if(loadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
getPurchaseHistoryById: async (id,LoadingScreen=true) => {
    const res = await shopAPI.get(PURCHASE_HISTORY_ENDPOINTS.GET_PURCHASEHISTORY_BY_ID.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state) => setTimeout(state,2000));
    }
    return res;
},
createPurchaseHistory: async (purchasehistoryData,LoadingScreen=true) => {
    const res = await shopAPI.post(PURCHASE_HISTORY_ENDPOINTS.CREATE_PURCHASEHISTORY, purchasehistoryData ,
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
updatePurchaseHistory: async (id,purchasehistoryData,LoadingScreen=true) => {
    const res = await shopAPI.put(PURCHASE_HISTORY_ENDPOINTS.UPDATE_PURCHASEHISTORY.replace(":id",id), purchasehistoryData ,
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
deletePurchaseHistory: async(id,LoadingScreen) => {
    const res = await shopAPI.delete(PURCHASE_HISTORY_ENDPOINTS.DELETE_PURCHASEHISTORY.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
}

export default purchaseHistoryApi