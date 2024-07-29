import { jwtDecode } from "jwt-decode";
import { JwtToken, UserRole } from "../models/JwtToken";
import express from "express";

export const allowRoles = (allowedRoles: UserRole[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!req.session.token) {
            return res.status(401).send('Not logged in');
        }

        const decodedToken: JwtToken = jwtDecode(req.session.token);
        if (!allowedRoles.includes(decodedToken.Role)) {
            return res.status(403).send('User role not authorised for this action');
        }

        next();
    }
}