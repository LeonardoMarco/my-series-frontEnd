import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {   
        authorization: 'Bearer '+localStorage.getItem('token'),
    }
})

const apis = {
    //Auth
    login: (user) => api.post('auth/login', user),
    register: (user) => api.post('auth/register', user),
    recover: (email) => api.post('auth/forgot_password', email),
    resetPassword: (password) => api.post('auth/reset_password', password),
    //groups
    groups: () => api.get('user/groups'),
    newGroup: (newGroup) => api.post('group/new', newGroup),
    

}


export default apis
