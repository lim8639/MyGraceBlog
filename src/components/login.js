
const checkUserStatus  = (router)=>{
    const token = localStorage.getItem('token')
    if (token == null){
        router.push('/login')
    }
}

export  {
    checkUserStatus
}