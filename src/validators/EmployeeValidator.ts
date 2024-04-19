import { EmployeeRequest } from "../models/EmployeeRequest"

export const validateEmployeeRequest = function (employeeRequest: EmployeeRequest): void {
    if (employeeRequest.salary < 20000) {
        throw new Error("Salary must be at least £20,000");
    }

    if (employeeRequest.bankNo.length != 8) {
        throw new Error("Invalid bank number");
    }
}