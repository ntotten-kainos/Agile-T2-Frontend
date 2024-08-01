import express from "express";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.locals.loggedin = true;
        res.render('jobRoles', { jobRoles: await getJobRoles(req.session.token) });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('jobRoles');
    }

};