import * as express from "express";
import * as mongoDb from "mongodb";
import {IDatabaseClient, IQuotes} from "../interfaces";
import TYPES from "../types";
import {inject} from "inversify";
import {injectable} from "inversify";

interface DbObject {
    _id: mongoDb.ObjectID;
}

interface Quote extends DbObject {
    author: string;
    quote: string;
}

@injectable()
export class Quotes implements IQuotes {
    private databaseClient: IDatabaseClient;

    public constructor(@inject(TYPES.DatabaseClient) databaseClient: IDatabaseClient) {
        this.databaseClient = databaseClient;
    }

    public getAll(req: express.Request, res: express.Response, next: express.NextFunction): void {
        this.databaseClient.collection('quotes').find().toArray((err: any, results: Quote[]) => {
            console.log(results)
            res.send(results);
        });
    }

    public post(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        return this.databaseClient.collection('quotes').insertOne(req.body).then((results: mongoDb.WriteOpResult) => {
            res.send(results);
            console.log(results)
        }, (error: any) => {
            console.error(error);
        });
    }
}
