import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import { getLoginForm, logout, postLoginForm } from "./controllers/AuthController";
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

app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 28800000 } }));

app.listen(3000, () => {
    console.log('Server started on port 3000');

});

// Login
app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);

// Log out
app.get('/logout', logout)

// Home
app.get('/', async (req: express.Request, res: express.Response) => {
  res.locals.loggedin = true;
  res.render("home.html");
});

// Job Roles
app.get('/job-roles', getAllJobRoles);
