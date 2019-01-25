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
    //Profile
    imageProfile: (image) => api.put('user/edit_image', image),
    removeImageProfile: (removeImageProfile) => api.post('user/remove_image', removeImageProfile),
    emailProfile: (email) => api.post('user/edit_email', email),
    nameProfile: (name) => api.post('user/edit_name', name),
    passwordProfile: (password) => api.post('user/edit_password', password),
    profile: () => api.get('user/profile'),
    //groups
    groups: () => api.get('user/groups'),
    checkMember: (checkMember) => api.post('user/check_user_exist_group', checkMember),
    addMember: (addMember) => api.post('group/add_user', addMember),
    newGroup: (newGroup) => api.post('group/new', newGroup),
    editGroup: (editGroup) => api.post('group/edit', editGroup),
    removeGroup: (removeGroup) => api.post('group/remove', removeGroup),
    //image groups
    editImage: (editImage) => api.post('group/edit_image', editImage),
    removeImage: (removeImage) => api.post('group/remove_image', removeImage),
    //favorite group
    favoriteGroup: (favoriteGroup) => api.post('group/change_star', favoriteGroup),
    //series
    series: (idGroup) => api.post('group/all_series', idGroup),
    // addSerie: (idGroup) => api.post('group/all_series', idGroup)
    

}


export default apis
