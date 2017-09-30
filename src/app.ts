import * as bodyParser from "body-parser";
import * as express from "express";
import TYPES from "./types";
import {inject} from "inversify";
import {injectable} from "inversify";
import {IDatabaseClient, IServer, IQuotes} from "./interfaces";

/**
 * The server.
 *
 * @class Server
 */

@injectable()
export class Server implements IServer {

    public expressApp: express.Application;
    private databaseClient: IDatabaseClient;
    private quotes: IQuotes;

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor(@inject(TYPES.DatabaseClient) databaseClient: IDatabaseClient,
                @inject(TYPES.Quotes) quotes: IQuotes) {

        this.databaseClient = databaseClient;
        this.quotes = quotes;

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

        var allowCrossDomain = (req: express.Request, res: express.Response, next: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Content-Type', 'application/json');

            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            } else {
                next();
            }
        }

        this.expressApp.use(allowCrossDomain);
        this.expressApp.use(bodyParser.json());

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

        //get all
        router.get("/quotes", (req: express.Request, res: express.Response, next: express.NextFunction) => this.quotes.getAll(req, res, next));

        //post
        router.post('/quotes', (req: express.Request, res: express.Response, next: express.NextFunction) => this.quotes.post(req, res, next));

        //use router middleware
        this.expressApp.use(router);
    }
}

