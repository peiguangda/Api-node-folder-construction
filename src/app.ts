import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";
import * as dotenv from "dotenv";

import * as router from "./routes/index";

dotenv.load({ path: '.env.development' });

let app: express.Express = express();

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", router);

app.use(errorHandler());

app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d"), app.get("port"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
