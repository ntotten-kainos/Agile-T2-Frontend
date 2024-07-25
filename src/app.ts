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

app.get('/', async (req: express.Request, res: express.Response) => {
  res.render("home.html");
});



