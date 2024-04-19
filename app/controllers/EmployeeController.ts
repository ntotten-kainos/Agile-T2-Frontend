import express from "express";
import { getAllEmployees, getSingleEmployee, createEmployee } from "../services/EmployeeService"

export const getIndex = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('employee-home');
};

export const getEmployees = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('list-employees', { employees: await getAllEmployees() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('list-employees');
    }
};


export const getEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('list-employee', { employee: await getSingleEmployee(req.params.id) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('list-employee');
    }
};

export const getEmployeeForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('employee-form') 
};

export const postEmployeeForm = async (req: express.Request, res: express.Response): Promise<void> => {
   try {        
        const id: number = await createEmployee(req.body)
        res.redirect('/employees/' + id)
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('employee-form', req.body)
    }
};