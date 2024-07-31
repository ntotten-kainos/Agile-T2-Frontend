import express from "express";
import { getJobRoleByID, getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRoles', { jobRoles: await getJobRoles() });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('jobRoles');
    }

};

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRoleDetail.html', { jobRole: await getJobRoleByID(req.params.id) });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('jobRoleDetail.html');
    }
}
