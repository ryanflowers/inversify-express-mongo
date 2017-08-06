import { Container } from "inversify";
import TYPES from "./types";
import * as app from "./app";
import * as dataBase from "./dataBase";
import {IDatabaseClient, IServer} from "./interfaces";

/**
 * Inversion Of Control class container
 */
class Kernel extends Container {
    constructor() {
        super();
        this.declareDependencies();
    }

    declareDependencies() {
        this.bind<IDatabaseClient>(TYPES.DatabaseClient).to(dataBase.DatabaseClient);
        this.bind<IServer>(TYPES.Server).to(app.Server);
    }
}

module.exports = new Kernel();
