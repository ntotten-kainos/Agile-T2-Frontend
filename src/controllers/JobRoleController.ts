import express from "express";
import { getJobRoles } from "../services/JobRoleService";

export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRoles', { jobRoles: await getJobRoles() });
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('jobRoles');
    }

};

// TODO : Method that runs on load/reload of the job information page to check if "Apply" should be visible or not
//  based on status of the jobRole. IF status=='open' && numPositions > 0 THEN show the "Apply" button on DOM.