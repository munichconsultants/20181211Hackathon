import * as express from "express";
import { Routes } from "./routes";
import * as passport from "passport";
import * as session from "express-session";
import { GoogleAuth } from "./google/googleAuthController";
import { GoogleRoutes } from "./google/googleRoutes";

class UseTheForceApp {
  private AppTitle: string = "UseTheForce";
  private AppPort: number = 3000;
  public app: express.Application;

  constructor() {
    this.app = this.app = express();

    this.app.use(session({ secret: "-- ENTER CUSTOM SESSION SECRET --" }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    const ga = new GoogleAuth();
    this.app.use(ga.Authenticate);
    
    this.routes();

    this.app.listen(this.AppPort, () => {
      console.log(`${this.AppTitle} listening on port ${this.AppPort}`);
    });
  }

  public routes() {
    this.app.use(new Routes().router);
    this.app.use('/google', new GoogleRoutes().router);
    
  }
}

const alexSeinApp = new UseTheForceApp();
