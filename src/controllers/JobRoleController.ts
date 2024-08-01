import express from "express";
import { getJobRoleByID, getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRoles', { jobRoles: await getJobRoles(req.session.token) });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('jobRoles');
    }

};

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRoleDetail', { jobRole: await getJobRoleByID(req.params.id, req.session.token) });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('jobRoleDetail');
    }
}
