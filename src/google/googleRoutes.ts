import * as express from 'express'
import * as passport from "passport";

export class GoogleRoutes {

    public router: express.Router;

    constructor() {
        this.router = express.Router();

        this.router.get('/logout', (req, resp) => {
            req.logOut();
            resp.redirect('https://accounts.google.com/logout');
        });

        this.router.get('/login',
            passport.authenticate('google', { scope: ['profile'] }));

        this.router.get('/callback', 
            passport.authenticate('google', { failureRedirect: '/login' }),
            (req, res) => {
                console.log('google callback is here!');
                // Successful authentication, redirect home.
                res.redirect('/');
            }
        );
    }
}