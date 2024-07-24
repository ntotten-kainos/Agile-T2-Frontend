import express from "express";
import { getAuthToken } from "../services/AuthService";

export const getLoginForm = async (req:express.Request, res:express.Response): Promise<void> => {
    res.render('loginForm.html');
}

export const postLoginForm = async (req:express.Request, res:express.Response): Promise<void> => {
    try {
        req.session.token = await getAuthToken(req.body);
        // Don't have a decided page to direct to after login - so will do root for now.
        res.redirect('/');
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('loginForm.html', req.body);
    }
}