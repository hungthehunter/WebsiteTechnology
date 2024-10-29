import shopAPI from "../axios/configAxios";

const USER_ENDPOINTS = {
    GET_ALL_USER:"/v1/admin/listUsers",
    GET_USER_BY_ID:"/v1/admin/:id",
    CREATE_USER:"/v1/admin",
    UPDATE_USER:"/v1/admin/:id",
    DELETE_USER:"/v1/admin/:id",
}


const userApi = {
getAllUser: async (loadingScreen=true) => {
    const res = await shopAPI.get(USER_ENDPOINTS.GET_ALL_USER);
    console.log("USER_ENDPOINTS.GET_ALL_USER" , USER_ENDPOINTS.GET_ALL_USER)
    if(loadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
getUserById: async (id,LoadingScreen=true) => {
    const res = await shopAPI.get(USER_ENDPOINTS.GET_USER_BY_ID.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state) => setTimeout(state,2000));
    }
    return res;
},
createProduct: async (userData,LoadingScreen=true) => {
    const res = await shopAPI.post(USER_ENDPOINTS.CREATE_USER, userData ,
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
updateProduct: async (id,userData,LoadingScreen=true) => {
    const res = await shopAPI.put(USER_ENDPOINTS.UPDATE_USER.replace(":id",id), userData ,
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
    const res = await shopAPI.delete(USER_ENDPOINTS.DELETE_USER.replace(":id",id));
    if(LoadingScreen){
        await new Promise((state)=>setTimeout(state,2000));
    }
    return res;
},
}

export default userApi