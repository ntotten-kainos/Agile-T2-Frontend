import express from "express";
import { getJobRoles } from "../services/JobRoleService";

export const getAllRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobRoles.html', {jobRoles: await getJobRoles()});
}