import axios from 'axios'
axios.defaults.timeout = 50000
const VUE_APP_BASEURL = import.meta.env.VITE_BASE_URL
axios.interceptors.request.use(config => {
    if (config.url.indexOf(VUE_APP_BASEURL) === -1) {
        config.url = VUE_APP_BASEURL + config.url;/*拼接完整请求路径*/
    }

    let token = localStorage.getItem("x-auth-token");
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.token = `${token}`;
    }
    return config
}, error => {
    return Promise.error(error)
})

function UploadUtils(data) {
    console.log(data)
    return axios.post(`/utils/upload`,data)
}

function getPost(id) {
    return axios.get(`/post/${id}`)
}
function delPost(data) {
    console.log(data)
    return axios.post(`/utils/upload`,data)
}
function changePost(data) {
    console.log(data)
    return axios.post(`/utils/upload`,data)
}
function getAllPost() {
    return axios.get(`/postlist`)
}
export {
    UploadUtils,
    getPost,
    delPost,
    getAllPost,
    changePost
}