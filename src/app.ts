import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import { getLoginForm, postLoginForm } from "./controllers/AuthController";

import { getAllJobRoles, getSingleJobRole } from "./controllers/JobRoleController";
import { UserRole } from "./models/JwtToken";
import { allowRoles } from "./middleware/AuthMiddleware";


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

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET environment variable is not defined.');

}

app.use(session({ secret: sessionSecret, cookie: { maxAge: 28800000 } }));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');

});

// Login
app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);

app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});

// Job Roles

app.get('/job-roles', allowRoles([UserRole.Admin, UserRole.User]),getAllJobRoles);
app.get('/job-roles/:id', getSingleJobRole);

