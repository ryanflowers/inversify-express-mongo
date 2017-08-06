import * as mongoClient from "mongodb";
import {injectable} from "inversify";
import {IDatabaseClient} from "../interfaces";

@injectable()
export class DatabaseClient implements IDatabaseClient{

    private db: mongoClient.Db;

    public connect(): Promise<any> {
        return mongoClient.MongoClient.connect('mongodb://ryanflowers:Pa55w0rd1@ds129043.mlab.com:29043/react-express-mongo').then((database: mongoClient.Db) => {
                 this.db = database;
        }, (error: any) => {
            console.error(error);
        })
    }

    public collection<T>(collectionName: string): mongoClient.Collection<T> {
        return this.db.collection<T>(collectionName);
    }
}
