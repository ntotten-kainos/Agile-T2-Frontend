import { getAuthToken } from './../services/AuthService';
import express from "express";

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.locals.loggedin = false;
    res.render('loginForm');
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getAuthToken(req.body);
        res.locals.loggedin = true;
        res.redirect('/');
    } catch (error) {
        res.locals.errormessage = error.message;
        res.locals.loggedin = false;
        res.render('loginForm', req.body);
    }
}

export const logout = async(req: express.Request, res: express.Response): Promise<void> => {
    // Wipe out the token from session storage.
    req.session.token = undefined;
    // Send the user to the login page.
    res.redirect('/loginForm');
}