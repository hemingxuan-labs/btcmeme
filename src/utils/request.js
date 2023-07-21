import axios from 'axios'
import { store } from '@/store/index.js'
let service = axios.create({
    baseURL: '',
    timeout: 20000
})
// 请求拦截器
service.interceptors.request.use(
    (config) => {
        console.log(store, 'storestorestore')

        config.headers['AuthAuthorize'] = store.getState().wallet.userToken || ''
        // config.url = import.meta.env.VITE_REQUEST_URL + config.url
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
//响应拦截器
service.interceptors.response.use(
    async (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service
