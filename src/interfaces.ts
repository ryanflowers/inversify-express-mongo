import * as mongoClient from "mongodb";
import * as express from "express";

export interface IDatabaseClient {
    connect(): Promise<any>;
    collection<T>(collectionName: string): mongoClient.Collection<T>;
}

export interface IServer {
    expressApp: express.Application;
}