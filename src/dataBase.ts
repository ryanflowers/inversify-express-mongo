import * as mongoClient from "mongodb";

//declare namespace Database {

    export interface IDatabaseClient {
        connect(): Promise<any>;
        collection<T>(collectionName: string): mongoClient.Collection<T>;
    }

    export class DatabaseClient implements IDatabaseClient{

        private db: mongoClient.Db;

        public connect(): Promise<any> {
            //let promise: Promise<any> = new Promise((resolve, reject) => {
                return mongoClient.MongoClient.connect('mongodb://ryanflowers:Pa55w0rd1@ds129043.mlab.com:29043/react-express-mongo').then((database: mongoClient.Db) => {
                    // if (err) {
                    //     reject(err);
                    // } else {
                         this.db = database;
                    //     resolve('Database connection successful');
                    // }
                }, (error: any) => {
                    console.error(error);
                })
            // });
            //
            // return promise;
        }

        public collection<T>(collectionName: string): mongoClient.Collection<T> {
            return this.db.collection<T>(collectionName);
        }
    }
//}

//export = Database;
