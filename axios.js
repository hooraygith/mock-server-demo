import axios from 'axios'

this.api = axios.create({
    baseURL: 'http://localhost:7777'
})

this.api.interceptors.request.use(config => {
    config.headers.accesstoken = Vue.$Util.getCache('accesstoken')
    return config
}, error => {
    return Promise.reject(error);
})

this.api.interceptors.response.use(res => {
    res = res.data
    if (!res || res.resultcode !== 200) {
        if (res.resultcode === 403) {
            Vue.$Util.removeCache('accesstoken')
        }
        return Promise.reject(res)
    } else {
        return res.data
    }
}, error => {
    return Promise.reject(error);
})
