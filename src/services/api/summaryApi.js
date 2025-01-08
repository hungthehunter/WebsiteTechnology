import shopAPI from "../axios/configAxios";

const summary_ENDPOINTS = {
    GET_ALL_summary:"/summary",
}


const summaryApi = {
getAllSummary: async (loadingScreen=true) => {
    const res = await shopAPI.get(summary_ENDPOINTS.GET_ALL_summary);
    if(loadingScreen){
        await new  Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
getSummaryById: async (id,LoadingScreen=true) => {
    const res = await shopAPI.get(summary_ENDPOINTS.GET_summary_BY_ID.replace(":id",id));
    if(LoadingScreen){
        await new  Promise((state) => setTimeout(state,2000));
    }
    return res;
},
createSummary: async (summaryData,LoadingScreen=true) => {
    const res = await shopAPI.post(summary_ENDPOINTS.CREATE_summary, summaryData ,
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
updateSummary: async (id,summaryData,LoadingScreen=true) => {
    const res = await shopAPI.put(summary_ENDPOINTS.UPDATE_summary.replace(":id",id), summaryData ,
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
deleteSummary: async(id,LoadingScreen) => {
    const res = await shopAPI.delete(summary_ENDPOINTS.DELETE_summary.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
}

export default summaryApi