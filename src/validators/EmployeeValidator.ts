import { EmployeeRequest } from "../models/EmployeeRequest"

export const validateEmployeeRequest = function (employeeRequest: EmployeeRequest): void {
    if (employeeRequest.salary < 20000) {
        throw new Error("Salary must be at least £20,000");
    }

    if (employeeRequest.bankNo.length != 8) {
        throw new Error("Invalid bank number");
    }

    if (employeeRequest.fname.length > 50) {
        throw new Error("Forename must be 50 characters or less");
    }

    if (employeeRequest.lname.length > 50) {
        throw new Error("Surname must be 50 characters or less");
    }

    if (employeeRequest.nin.length != 9) {
        throw new Error("National Insurance Number must be 9 characters");
    }
}