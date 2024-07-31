import express from "express";

export const getApplicationForm = async (req:express.Request, res:express.Response) => {
    res.locals.jobRoleTitle = "Test Job Role";
    res.render('applicationForm');
}

export const postApplicationForm = async (req:express.Request, res:express.Response) => {
    try {
        // Try to post the CV file to AWS S3
        // Add a record to UserApplications tracking this userID, jobRoleID and set the status to 'IN_PROGRESS'
        // Redirect to the job role info page? Or an on-screen pop up that says something
        //  like "Application Submitted" and gives the user an option to go back to the home page.
        
    } catch (error) {
        res.locals.errormessage = error.message;
        res.locals.jobRoleTitle = "Test Job Role";
        res.render('applicationForm', req.body);
    }
}
