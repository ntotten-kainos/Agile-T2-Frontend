import { getAuthToken } from './../services/AuthService';
import express from "express";
import { SessionData } from "express-session";

declare module "express-session" {
    interface SessionData {
        loggedOut: boolean;
    }
}

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginForm');
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        req.session.token = await getAuthToken(req.body);
        res.redirect('/');
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('loginForm', req.body);
    }
}

export const logout = async (req: express.Request, res: express.Response): Promise<void> => {
    // Wipe out the token from session storage.
    req.session.token = undefined;
    // Set a flag to indicate the user has logged out.
    req.session.loggedOut = true;
    // Send the user to the login page with a query parameter.
    res.redirect('/loginForm?loggedOut=true');
}
