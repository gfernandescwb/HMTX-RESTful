import { Request, Response } from 'express';

import IApp from '@Interfaces/App';

class GlobalException {
  constructor({ app }: IApp) {
    this.globalException({ app });
  }

  private globalException({ app }: IApp) {
    app.use((err: Error, _: Request, res: Response) => {
      console.error(err.stack);
      res.status(500).json({ error: true }).end();
    });
  }
}

export default GlobalException;
