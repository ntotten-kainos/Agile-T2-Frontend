import { LoginRequest } from "../models/LoginRequest";
import axios, { AxiosResponse } from "axios";
import { validateLoginRequest } from "../validators/LoginRequestValidator";
import { requestInstance } from "../models";

// axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/api/auth/login";

export const getAuthToken = async (loginRequest: LoginRequest): Promise<string> => {
    validateLoginRequest(loginRequest);
    try {
        const loginResponse: AxiosResponse = await requestInstance.post(URL, loginRequest);

        return loginResponse.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}