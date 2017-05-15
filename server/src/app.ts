import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

function configureCors(expressApplication: express.Application): void {
  expressApplication.use(cors());
}

function configureMiddleware(expressApplication: express.Application): void {
  expressApplication.use(logger("dev"));
  expressApplication.use(bodyParser.json());
  expressApplication.use(bodyParser.urlencoded({ extended: false }));
}

function configureRoutes(expressApplication: express.Application): void {
  const router = express.Router();

  router.get("/", (req, res, next) => {
    res.json({
      message: "Hello World!"
    });
  });

  expressApplication.use("/", router);
}

const expressApplication = express();
configureCors(expressApplication);
configureMiddleware(expressApplication);
configureRoutes(expressApplication);

export default expressApplication;
