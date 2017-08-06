import * as express from "express";
import * as mongoDb from "mongodb";
import {IDatabaseClient} from "../interfaces";

interface DbObject {
    _id: mongoDb.ObjectID;
}

interface Quote extends DbObject{
    author: string;
    quote: string;
}

export class Quotes {
    private databaseClient: IDatabaseClient;

    public constructor(databaseClient: IDatabaseClient) {
        this.databaseClient = databaseClient;
    }

    public getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.databaseClient.collection('quotes').find().toArray(function(err: any, results: Quote[]) {
            console.log(results)
            res.send(results);
        });
    }

    public post(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        return this.databaseClient.collection('quotes').save(req.body).then((results: mongoDb.WriteOpResult) => {
            res.send(results);
            console.log(results)
        }, (error: any) => {
            console.error(error);
        });
    }
}
