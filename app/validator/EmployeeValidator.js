module.exports = class EmployeeValidator {
    validateEmployee = function (employee) {
        if (isNaN(employee.salary)) {
            return "Salary must be a number"
        }

        if (Number(employee.salary) < 20000) {
            return "Salary must be at least £20,000"
        }

        if (employee.bankNo.length != 8) {
            return "Invalid bank number"
        }

        return null
    }
}