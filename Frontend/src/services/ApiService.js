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
            return response.response.data
        })
}

export async function requestLogin(formInfo) {
    return axios.post('/login', formInfo)
        .then( response => {
            return response.data
        }, response => {
            return response.response.data
        })
}

export async function getCardList() {
    return axios.get('/cards/list')
        .then( response => {
            return response.data
        }, response => {
             return response.response.data
    })
}

export async function getFixedExpenses() {
    return axios.get('/expenses/fixed')
        .then( response => {
            return response.data
        }, response => {
             return response.response.data
    })
}

export async function addNewFixedExpense(newExpense) {
    return axios.post('/expenses/fixed/add', newExpense)
        .then( response => {
            return response.data
        }, response => {
            return response.response.data
        })
}

export async function removeFixedExpense(id) {
    return axios.delete('/expenses/fixed/'+id)
        .then( response => {
            return response.data
        }, response => {
            return response.response.data
        })
}

export async function getIncome() {
    return axios.get('/income/list')
        .then( response => {
            return response.data
        }, response => {
             return response.response.data
    })
}

export function addIncome(incomeData) {
    return axios.post('/income/add', incomeData)
        .then( response => {
            return response.data
        }, response => {
            return response
        })
}

export function removeIncomeById(id) {
    return axios.delete('/income/remove/' + id)
        .then( response => {
            return response.data
        }, response => {
            return response
        })
}