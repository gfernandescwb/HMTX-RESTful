import { json } from 'express';
import morgan from 'morgan';

import IApp from "@Interfaces/App";

class ServerDependencies {
    constructor({ app }: IApp) {
        this.setDependencies({ app });
    }

    private setDependencies({ app }: IApp) {
        app.use(json());
        app.use(morgan('dev'));
    }
}

export default ServerDependencies;