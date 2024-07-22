import axios, {AxiosResponse} from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";

export const getJobRoles = async (): Promise<JobRoleResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/job-role"); // will need amended
        return response.data;
    } catch(e) {
        console.log(e);
        throw new Error('Failed to get Job Roles');
    }
}