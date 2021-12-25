// 封装axois
import axios from 'axios'
import { Promise } from 'core-js'
import { ElMessage } from 'element-plus'
import store from '@/store'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

//请求拦截器
service.interceptors.request.use(options => {
    //判断token是否存在
    if (store.getters.token) {
        // 如果token存在 注入token
        options.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return options
}, error => {
    return new Promise(error)
})


// 响应拦截器
service.interceptors.response.use(
    response => {
        const data = response.data
            //   要根据success的成功与否决定下面的操作
        if (data.success) {
            return data
        } else {
            // 业务错误
            ElMessage.warning(data.errorMessage) // 提示错误消息
            return Promise.reject(new Error(data.errorMessage))
        }
    },
    error => {
        console.log(error)
            // TODO: 将来处理 token 超时问题 接受401状态码以及 刷新token的操作
        ElMessage.error(error.message) // 提示错误信息
        return Promise.reject(error)
    }
)

export default service