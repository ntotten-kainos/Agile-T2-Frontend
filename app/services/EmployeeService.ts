import axios, { AxiosResponse } from "axios";
import { validateEmployeeRequest } from "../validators/EmployeeValidator"
import { EmployeeRequest } from "../models/EmployeeRequest"
import { EmployeeResponse } from "../models/EmployeeResponse"

axios.defaults.baseURL = process.env.API_URL;

export const URL: string = "/hr/employee/";


export const createEmployee = async function (employee: EmployeeRequest): Promise<number> {
    try {
        validateEmployeeRequest(employee);

        const response: AxiosResponse = await axios.post(URL, employee)

        return response.data
    } catch (e) {
        throw new Error(e.message)
    }    
}

export const getSingleEmployee = async function (id: string): Promise<EmployeeResponse> {
    const response: AxiosResponse = await axios.get(URL + id);

    return response.data
}

export const getAllEmployees = async function (): Promise<EmployeeResponse[]> {
    const response: AxiosResponse = await axios.get(URL);
    
    return response.data
}