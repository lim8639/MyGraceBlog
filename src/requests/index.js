import axios from 'axios'
axios.defaults.timeout = 50000
const VUE_APP_BASEURL = import.meta.env.VITE_BASE_URL
axios.interceptors.request.use(config => {
    if (config.url.indexOf(VUE_APP_BASEURL) === -1) {
        config.url = VUE_APP_BASEURL + config.url;/*拼接完整请求路径*/
    }

    let token = localStorage.getItem("token");
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `${token}`;
    }

    return config
}, error => {
    return Promise.error(error)
})

function UploadUtils(data) {
    console.log(data)
    return axios.post(`/utils/upload`,data)
}
// t03FKvZt9P3aLt30lhjyQ3dx54b3wAlTRZUZ7Aiv4WbRnFAgoM3OI6eea7l3Pz9SmkBrnLyE5ecClTyu5QAvAWQ7vk15zs4Jt7jAEzhz9H0_n1u6ri5yK0XR68hrF8BW8fg

function getPost(id) {
    return axios.get(`/article/${id}`)
}
function delPost(data) {
    console.log(data)
    return axios.post(`/utils/upload`,data)
}
function savePost(data) {
    console.log(data)
    return axios.post(`/article/`,data)
}
function getAllPost() {
    console.log("正在请求")
    return axios.get(`/articles`)
}
function editorAllPost() {
    return axios.get(`/postlist`)
}

function userloginApi(data) {
    return axios.post(`/user`,data)
}

function uploadImage(form){
    return axios.post('/post/upload/', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

}

function getDataApi(form){
    return axios.get('/data/api')

}

export {
    UploadUtils,
    getPost,
    delPost,
    getAllPost,
    savePost,
    uploadImage,
    userloginApi,
    getDataApi
}