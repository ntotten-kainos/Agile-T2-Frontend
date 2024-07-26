import express from "express";
import nunjucks from "nunjucks";

import { getAllJobRoles } from "./controllers/JobRoleController";

const app = express();

app.use(express.static('public'));
app.set('view engine', 'html')

nunjucks.configure('views', {
    autoescape: true,
    express: app
});



app.listen(3000, () => {
    console.log('Server started on port 3000');

});

app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});

app.get('/job-roles', getAllJobRoles);


