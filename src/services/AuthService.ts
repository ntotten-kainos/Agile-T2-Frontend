import { LoginRequest } from "../models/LoginRequest";
import axios, { AxiosResponse } from "axios";

export const getAuthToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        const loginResponse: AxiosResponse = await axios.post("http://localhost:8080/api/auth/login", loginRequest);
        return loginResponse.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data);
    }
}