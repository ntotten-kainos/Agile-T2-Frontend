import express from "express";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    const orderBy = req.query.orderBy as string || "default";
    const direction = req.query.direction as string || "default";

    try {
        const jobRoles = await getJobRoles(req.session.token, orderBy, direction);
        res.render('jobRoles', { jobRoles, orderBy, direction });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('jobRoles', { orderBy, direction });
    }
};


