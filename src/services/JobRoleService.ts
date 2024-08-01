import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";

import { JobRoleDetailResponse } from "../models/JobRoleDetailResponse";

import { getHeader } from "./AuthUtil";


axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/api/job-roles/";


export const getJobRoles = async (token: string): Promise<JobRoleResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(URL, getHeader(token)); 
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get Job Roles');
    }
}

export const getJobRoleByID = async (id: String): Promise<JobRoleDetailResponse> =>{
    try {
        const response: AxiosResponse = await axios.get(URL + id);

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get Job Role');
    }
}
