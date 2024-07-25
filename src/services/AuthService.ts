import { LoginRequest } from "../models/LoginRequest";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';
export const URL: string = "/hr/employee/";

export const getAuthToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        const loginResponse: AxiosResponse = await axios.post(URL, loginRequest);
        return loginResponse.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data);
    }
}