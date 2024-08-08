import express from "express";
import { getJobRoleByID, getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    const orderBy = req.query.orderBy as string;
    const direction = req.query.direction as string;

    try {
        const jobRoles = await getJobRoles(req.session.token, orderBy, direction);
        res.render('jobRoles', { jobRoles, orderBy, direction });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('jobRoles', { jobRoles: [], orderBy, direction });
    }
};

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const jobRole = await getJobRoleByID(req.params.id, req.session.token);
        res.render('jobRoleDetail', { jobRole });
    } catch (error) {
        if (error.message === 'Role does not exist') {
            res.status(404).render('404error');
        } else {
            res.locals.errormessage = error.message;
            res.render('jobRoleDetail');
        }
    }
};