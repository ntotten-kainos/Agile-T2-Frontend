import { getAuthToken } from './../services/AuthService';
import express from "express";

export const getLoginForm = async (req:express.Request, res:express.Response): Promise<void> => {
    res.render('loginForm');
}

export const postLoginForm = async (req:express.Request, res:express.Response): Promise<void> => {
    try {
        console.log(req);
        console.log(req.body);
        console.log(req.session);
        req.session.token = await getAuthToken(req.body);
        res.redirect('/');
    } catch (error) {
        res.locals.errormessage = error.message;
        res.render('loginForm', req.body);
    }
}