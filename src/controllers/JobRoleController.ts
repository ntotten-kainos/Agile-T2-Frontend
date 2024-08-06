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
        const jobRole = await getJobRoleByID(req.params.id, req.session.token);
        res.render('jobRoleDetail', { jobRole });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('jobRoleDetail');
    }
};
