import * as express from "express";
import * as mongoDb from "mongodb";
import {IDatabaseClient, IQuotes} from "../interfaces";
import TYPES from "../types";
import {inject} from "inversify";
import {injectable} from "inversify";
import {isNullOrUndefined} from "util";

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

    public delete(req: express.Request, res: express.Response, next: express.NextFunction): void {
        let id = req.param("id");
        if(!isNullOrUndefined(id)) {
            this.databaseClient.collection('quotes').deleteOne({ _id: new mongoDb.ObjectID(id) }).then((results: mongoDb.DeleteWriteOpResultObject) => {
                res.send(id);
                console.log(results)
            }, (error: any) => {
                console.error(error);
                res.status(500)
                    .send('Error deleting quote');
            });
        } else {
            res.status(404)
                .send('Not found');
        }

    }

    public post(req: express.Request, res: express.Response, next: express.NextFunction): void {
        this.databaseClient.collection('quotes').insertOne(req.body).then((results: mongoDb.InsertOneWriteOpResult) => {
            res.send({ _id: results.insertedId.toString()});
            console.log(results)
        }, (error: any) => {
            console.error(error);
        });
    }
}
