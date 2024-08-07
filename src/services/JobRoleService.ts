import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRoleDetailResponse } from "../models/JobRoleDetailResponse";
import { getHeader } from "./AuthUtil";

export { URL };

const URL: string = "/api/job-roles/";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

interface Params {
    orderBy?: string;
    direction?: string;
}

export const getJobRoles = async (token: string, orderBy?: string, direction?: string): Promise<JobRoleResponse[]> => {
    try {
        const params: Params = {};
        if (orderBy) params.orderBy = orderBy;
        if (direction) params.direction = direction;

        const response: AxiosResponse = await axios.get(URL, {
            headers: getHeader(token).headers,
            params
        });

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get Job Roles');
    }
}

export const getJobRoleByID = async (id: string, token: string): Promise<JobRoleDetailResponse> => {
    if (id == null || id == '') {
        throw new Error('Invalid Job ID');
    }
    try {
        const response: AxiosResponse = await axios.get(URL + id, getHeader(token));
        return response.data;
    } catch (e) {
        if (e.response?.status == 404) {
            throw new Error('Role does not exist');
        } else {
            throw new Error('Failed to get Job Role Details');
        }
    }
};;
