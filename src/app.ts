import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { getLoginForm, postLoginForm } from "./controllers/AuthController";
import { getAllJobRoles } from "./controllers/JobRoleController";

const app = express();

app.use(express.static('public'));
app.set('view engine', 'html')

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 } }));

app.listen(3000, () => {
    console.log('Server started on port 3000');

});

// Login
app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);

// Job Roles
app.get('/job-roles', getAllJobRoles);
