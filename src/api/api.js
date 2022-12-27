import axios from "axios";



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ad9f5fe5-fe3c-47a6-86c3-b0183bd5e223"
    }

});



export const UsersAPI = {
    requestUsers(currentPage = 1, pageSize = 10) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(Response => {
                    return Response.data;
                })
        )
    },
    follow(userId) {
        return (
            instance.post(`follow/${userId}`)
        )
    },
    unfollow(userId) {
        return (
            instance.delete(`follow/${userId}`)
        )
    },
    getProfile(userId) {
        console.warn('use profileAPI object')
        return (
            ProfileAPI.getProfile(userId)
        )
    }
}

export const ProfileAPI = {
    getProfile(userId) {
        return (
            instance.get(`profile/` + userId)
        )
    },
    getStatus(userId) {
        return (
            instance.get(`profile/status/` + userId)
        )
    },
    updateStatus(status) {
        return (
            instance.put(`profile/status/`, { status })
                .then(response => response.data)
        )
    },
}

export const AuthAPI = {
    me() {
        return (
            instance.get(`auth/me`)
        )
    },
    login(email, password, rememberMe = false) {
        return (
            instance.post(`auth/login`, { email, password, rememberMe })
        )
    },
    logout() {
        return (
            instance.delete(`auth/login`)
        )
    }
}

