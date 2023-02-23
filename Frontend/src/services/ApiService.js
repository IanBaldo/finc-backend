const axios = require('axios').default

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.baseURL = 'http://192.168.0.65:5000'
    config.headers.Authorization =  token;
     
    return config;
});

export async function testConnection() {
    return await axios.get('/')
        .then ( response => {
            return response.data
        }, response => {
            console.log(response)
            return false
        })
}

export async function requestLogin(formInfo) {
    return axios.post('/login', formInfo)
        .then( response => {
            console.log(response.data)
            return response.data
        }, response => {
            return null
        })
}