import axios, { AxiosResponse } from "axios";
import { validateEmployeeRequest } from "../validators/EmployeeValidator"
import { EmployeeRequest } from "../models/EmployeeRequest"
import { EmployeeResponse } from "../models/EmployeeResponse"
import e from "express";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/hr/employee/";

export const createEmployee = async function (employee: EmployeeRequest): Promise<number> {
    try {
        validateEmployeeRequest(employee);

        const response: AxiosResponse = await axios.post(URL, employee);

        return response.data;
    } catch (e) {
        if (e.response.status == 400) {
            throw new Error("Invalid Data");
        }
        if (e.response.status == 500) {
            throw new Error("Could not create employee");
        }
        throw new Error(e.message);
    }    
}

export const getSingleEmployee = async function (id: string): Promise<EmployeeResponse> {
    if (!id) {
        throw new Error("Invalid ID");
    }

    try {
        const response: AxiosResponse = await axios.get(URL + id);
        return response.data;
    } catch (error) {
        if (error.response.status == 400) {
            throw new Error("Employee does not exist");
        }
        if (error.response.status == 500) {
            throw new Error("Failed to get employee")
        }
        throw new Error(error.message);
    }
    
}

export const getAllEmployees = async function (): Promise<EmployeeResponse[]> {
    try {
        const response: AxiosResponse = await axios.get(URL);
    
        return response.data;
    } catch (e) {
        throw new Error("Could not get employees");
    }
}