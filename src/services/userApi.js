import axiosClient from './axiosClient.js'


const userApi = {
    register(userData) {
        return axiosClient.post('/users', userData)
    },
    checkUsernameExists: async (username) => {
        const users = await axiosClient.get(`/users?username=${username}`)
        return users.length > 0
    },
    checkPasswordExists: async (password) => {
        const users = await axiosClient.get(`/users?password=${password}`)
        return users.length > 0
    },
    checkEmailExists: async (email) => {
        const users = await axiosClient.get(`/users?email=${email}`)
        return users.length > 0
    },
    login: async (username, password) => {
        const users = await axiosClient.get(`/users?username=${username}&password=${password}`)
        if (users.length > 0) {
            return users[0]

        } else {
            throw new Error('Tên đăng nhập hoặc mật khẩu không đúng')
        }
    }
}

export default userApi