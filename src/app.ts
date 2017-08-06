import * as bodyParser from "body-parser";
import * as express from "express";
import {Quotes} from "./routes/quotes";
import TYPES from "./types";
import {inject} from "inversify";
import {injectable} from "inversify";
import {IDatabaseClient, IServer} from "./interfaces";

/**
 * The server.
 *
 * @class Server
 */

@injectable()
export class Server implements IServer {

    public expressApp: express.Application;
    private databaseClient: IDatabaseClient;
    private quotes: Quotes;

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor(@inject(TYPES.DatabaseClient) databaseClient: IDatabaseClient) {
        this.databaseClient = databaseClient; // new dataBase.DatabaseClient();

        // TODO Use DI
        this.expressApp = express();

        //configure application
        this.config();

        //configure routes
        this.routes();
    }

    /**
     * Configure the application
     */
    private config() {
        this.expressApp.use(bodyParser.urlencoded({extended: true}));

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
        this.quotes = new Quotes(this.databaseClient);

        //get all
        router.get("/quotes", (req: express.Request, res: express.Response, next: express.NextFunction) => this.quotes.getAll(req, res, next));

        //post
        router.post('/quotes', (req: express.Request, res: express.Response, next: express.NextFunction) => this.quotes.post(req, res, next));

        //use router middleware
        this.expressApp.use(router);
    }
}

