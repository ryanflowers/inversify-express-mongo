"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as quotesRoute from "./routes/quotes";
import * as dataBase from "./dataBase";

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;
    private databaseClient: dataBase.IDatabaseClient;
    private quotes: quotesRoute.Quotes;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // TODO Use DI
        this.databaseClient = new dataBase.DatabaseClient();

        // TODO Use DI
        this.app = express();

        //configure application
        this.config();

        //configure routes
        this.routes();
    }

    /**
     * Configure the application
     */
    private config() {
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.databaseClient.connect().then(() => {
            console.log('Database connection successful');
        }).catch((error: any) => {
            console.error('Database connection unsuccessful:' + error);
        });
    }

    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        //get router
        let router: express.Router;
        router = express.Router();

        //create routes
        this.quotes = new quotesRoute.Quotes(this.databaseClient);

        //get all
        router.get("/quotes", (req: express.Request, res: express.Response, next: express.NextFunction) => this.quotes.getAll(req, res, next));

        //post
        router.post('/quotes', (req: express.Request, res: express.Response, next: express.NextFunction) => this.quotes.post(req, res, next));

        //use router middleware
        this.app.use(router);
    }
}

export = Server.bootstrap().app;