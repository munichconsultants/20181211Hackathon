import * as express from "express";
import * as passport from "passport";
import { Strategy } from "passport-google-oauth2";


export class GoogleAuth {
  constructor() {
  }

  Authenticate = (
    req: express.Request,
    res: express.Response,
    next: Function
  ) => {
    this.googleAuth(req, res, next);
  };

  public googleAuth(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    console.log("in googleAuth");
    passport.serializeUser((user: passport.Profile, cb: Function) => {
      cb(null, user);
    });

    passport.deserializeUser((obj: passport.Profile, cb: Function) => {
      cb(null, obj);
    });

    passport.use(
      new Strategy(
        {
          clientID:
            "MY-CLIENTID",
          clientSecret: "MY-SECRET",
          callbackURL: "http://localhost:3000/google/callback"
        },
        (accessToken, refreshToken, profile, cb) => {
          console.log(profile);
          return cb(null, profile);
        }
      )
    );

    next();
  }
}
