import 'reflect-metadata';
import express, { Application } from 'express';
import { container } from 'tsyringe';

import ServeConfig from '@Config/Serve';
import ServerDependencies from '@Dependencies/Server';
import GlobalException from '@Middlewares/GlobalException';
import DefaultRoutes from '@Routes/DefaultRoutes';
import UserRoutes from '@Routes/UserRoutes';
import IStart from '@Interfaces/Start';
import IServer from '@Interfaces/Server';
import IApp from '@Interfaces/App';

class Server {
  private app: Application;

  constructor({ port }: IServer) {
    this.app = express();

    this.start({ app: this.app, port: port });
  }

  private dependencies({ app }: IApp) {
    new ServerDependencies({ app });
  }

  private routes({ app }: IApp) {
    new DefaultRoutes({ app });
    container.register<Application>('App', { useValue: app });
    container.resolve(UserRoutes);
  }

  private middlewares({ app }: IApp) {
    new GlobalException({ app });
  }

  public start({ app, port }: IStart) {
    this.dependencies({ app });
    this.routes({ app });
    this.middlewares({ app });
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  }
}

const config = new ServeConfig().config;

new Server({
  port: config.port,
});
