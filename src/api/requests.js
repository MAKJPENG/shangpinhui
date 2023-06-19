// 对axios进行二次封装
import axios from 'axios'
import { getToken } from '@/utils/token'
import { getUUID } from '@/utils/uuid_token'
// 引入进度条模块和样式
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建axios实例对象
const requests = axios.create({
    // 配置基础路径
    baseURL: '/api',
    // baseURL: 'http://gmall-h5-api.atguigu.cn',
    // 配置请求超时
    timeout: 5000
})
// 请求拦截器request
requests.interceptors.request.use((config) => {
    // 进度条开始
    nProgress.start()
    const uuid = getUUID()
    const token = getToken()
    // 判断是否有uuid
    if (uuid) {
        config.headers.userTempId = uuid
    }
    // 判断是否有token
    if (token) {
        config.headers.token = token
    }
    //   配置对象，里面有一个请求头，非常重要
    return config
})
// 响应拦截器response
requests.interceptors.response.use((response) => {
    // 进度条结束
    nProgress.done()
    return response.data
}, (error) => {
    // return Promise.reject(new Error('faile'))
    console.error(error)
})

export default requests