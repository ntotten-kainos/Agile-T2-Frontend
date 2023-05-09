const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

module.exports.URL = '/hr/employee/'


module.exports.createEmployee = async function (employee) {
    const response = await axios.post(this.URL, employee)

    return response.data
}

module.exports.getEmployee = async function (id) {
    const response = await axios.get(this.URL + id)

    return response.data
}

module.exports.getEmployees = async function () {
    try {
        const response = await axios.get(this.URL)

        return response.data
    } catch (e) {
        return new Error('Could not get employees')
    }
}