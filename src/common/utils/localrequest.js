import axios from "axios";

// 请求拦截
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {

    console.log("axios-instance-------error",error)
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("axios-response--------res",response)

    return response;
}, function (error) {

    console.log("axios-instance--------res error",error.message)
    // 对响应错误做点什么
    return Promise.reject(error);
})

export default axios;
