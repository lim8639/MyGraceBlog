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


function  createProjectApi(){
    return axios.post("/project/")
}

function  getProjectsApi(limit,offset){
    return axios.get("/projects/",{
        limit:limit,
        offset:offset,
    })
}
function  updateProjectsApi(data){
    return axios.put(`/project/${data.id}`,data)
}
function  deleteProjectsApi(id){
    return axios.delete(`/project/${id}`)
}
export {
    createProjectApi,
    getProjectsApi,
    updateProjectsApi,
    deleteProjectsApi,
}