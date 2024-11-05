import axios from "axios";

const MAIN_URL="http://localhost:8080/api";

// cấu hình request ngoài những thành phần này còn data , header ,....
const shopAPI=axios.create({
    baseURL:MAIN_URL,
    timeout: 10000,
    headers:{
        "Content-Type":"application/json"
    }
}
)

// hàm này chạy trước response , config ở đây là Trả về cấu hình request đã được chỉnh sửa(headers , baseURL, timeout , data ,...)
shopAPI.interceptors.request.use((config)=>{
try {
    const token=localStorage.getItem("authToken");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
} catch (error) {
    console.error(error)
}
}, 
//cho phép code gọi API có thể bắt và xử lý lỗi này thông qua Promise.reject(error)
(error)=>{
 return Promise.reject(error);
}
)

shopAPI.interceptors.response.use((response)=>{
    return response.data;
},
(error)=>{
    if(error.response){
        console.error("Error response ",error.response.data);
    }else  if(error.request){ 
        console.error("Error request ",error.request.data)
    }else{
        console.error(error.message)
    }
    return Promise.reject(error);
}
)

export default shopAPI