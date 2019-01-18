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
    editGroup: (editGroup) => api.post('group/edit', editGroup),
    removeGroup: (removeGroup) => api.post('group/remove', removeGroup),
    //image groups
    editImage: (editImage) => api.post('group/edit_image', editImage),
    removeImage: (removeImage) => api.post('group/remove_image', removeImage)
    

}


export default apis
