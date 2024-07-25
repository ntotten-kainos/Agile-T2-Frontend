import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { getLoginForm, postLoginForm } from "./controllers/AuthController";
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/loginForm', getLoginForm);
app.post('/loginForm', postLoginForm);

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 } }));

declare module "express-session" {
  interface SessionData { token: string; }
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});