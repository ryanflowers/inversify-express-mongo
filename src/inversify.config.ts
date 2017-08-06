import { Container } from "inversify";
import TYPES from "./types";
import {Quotes} from "./routes/quotes";
import {Server} from "./app";
import {DatabaseClient} from "./services/dataBase";
import {IDatabaseClient, IServer, IQuotes} from "./interfaces";

/**
 * Inversion Of Control class container
 */
class Kernel extends Container {
    constructor() {
        super();
        this.declareDependencies();
    }

    declareDependencies() {
        this.bind<IDatabaseClient>(TYPES.DatabaseClient).to(DatabaseClient).inSingletonScope();
        this.bind<IServer>(TYPES.Server).to(Server).inSingletonScope();
        this.bind<IQuotes>(TYPES.Quotes).to(Quotes).inSingletonScope();
    }
}

module.exports = new Kernel();
