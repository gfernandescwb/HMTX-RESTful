import { Request, Response } from 'express';

import IApp from '@Interfaces/App';

class DefaultRoutes {
  constructor({ app }: IApp) {
    this.defaultRoutes({ app });
  }

  private defaultRoutes({ app }: IApp) {
    app.get('/', (_: Request, res: Response) => {
      res.status(200).json({ msg: 'Hello World!' }).end();
    });
  }
}

export default DefaultRoutes;
