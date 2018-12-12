import * as express from 'express'

import * as httpStatus from "http-status-codes";

export class Routes {

    public router: express.Router;

    constructor() {
        this.router = express.Router();

        this.router.get('/', (req, resp) => {
            if (!req.isAuthenticated())
                return resp.redirect('/google/login');

            return resp.redirect('/index');
        });

        this.router.get('/login', (req, resp) => {
            resp.redirect('/google/login');
        });

        this.router.get('/logout', (req, resp) => {
            if(1===1) //is google
                resp.redirect('/google/logout');
        });


        this.router.get('/index', (req, resp) => {
            if (!req.isAuthenticated())
                return resp.redirect('/google/login');

            let html = '<img src="'+ req.user.photos[0].value +'"/>';
            return resp.status(httpStatus.OK).send(html);
        });
    }
}