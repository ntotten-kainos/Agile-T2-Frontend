import express from "express";
import nunjucks from "nunjucks";

import { getAllJobRoles } from "./controllers/JobRoleController";

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

//app.use(express.static('public'));
//app.set('view engine', 'html')



app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/job-role', getAllJobRoles);