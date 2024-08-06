import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { getHeader } from "./AuthUtil";

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
};

export { URL };
