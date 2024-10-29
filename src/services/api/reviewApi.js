import shopAPI from "../axios/configAxios";

const REVIEW_ENDPOINTS = {
    GET_ALL_REVIEW:"/reviews",
    GET_REVIEW_BY_ID:"/reviews/:id",
    CREATE_REVIEW:"/reviews",
    UPDATE_REVIEW:"/reviews/:id",
    DELETE_REVIEW:"/reviews/:id",
}


const reviewApi = {
getAllReview: async (loadingScreen=true) => {
    const res = await shopAPI.get(REVIEW_ENDPOINTS.GET_ALL_REVIEW);
    if(loadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
getReviewById: async (id,LoadingScreen=true) => {
    const res = await shopAPI.get(REVIEW_ENDPOINTS.GET_REVIEW_BY_ID.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state) => setTimeout(state,2000));
    }
    return res;
},
createReview: async (reviewData,LoadingScreen=true) => {
    const res = await shopAPI.post(REVIEW_ENDPOINTS.CREATE_REVIEW, reviewData ,
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
updateReview: async (id,reviewData,LoadingScreen=true) => {
    const res = await shopAPI.put(REVIEW_ENDPOINTS.UPDATE_REVIEW.replace(":id",id), reviewData ,
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
deleteReview: async(id,LoadingScreen) => {
    const res = await shopAPI.delete(REVIEW_ENDPOINTS.DELETE_REVIEW.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
}

export default reviewApi