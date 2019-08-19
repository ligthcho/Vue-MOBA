import axios from 'axios' 
import Vue from 'vue' //注意大小写

const http = axios.create({
    baseURL:"http://localhost:3000/admin/api"
})


// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //Bearer 规范写法 后面有空格
    config.headers.Authorization = 'Bearer ' + localStorage.token;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

//axios家的通用的错误处理 
http.interceptors.response.use(res =>{
    return res
},err=>{
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
    }
})
export default http