import axios from "axios";

// 请求拦截
axios.interceptors.request.use(function (config) {

    console.log("axios-instance--------")
    // 在发送请求之前做些什么
    return config;
}, function (error) {

    console.log("axios-instance-------error")
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("axios-instance--------res")

    return response;
}, function (error) {

    console.log("axios-instance--------res error",error.message)
    // 对响应错误做点什么
    return Promise.reject(error);
})

export default axios;
