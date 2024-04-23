import { EmployeeController } from "./controllers/EmployeeController";
import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static('public'));
app.set('view engine', 'html')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/', EmployeeController.getIndex);
app.get('/employees', EmployeeController.getEmployees);
app.get('/employees/:id', EmployeeController.getEmployee);
app.get('/insert-employee', EmployeeController.getEmployeeForm);
app.post('/insert-employee', EmployeeController.postEmployeeForm);