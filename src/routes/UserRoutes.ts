import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { Request, Response, static as s, Application } from 'express';
import path from 'path';

import { UserDTO } from '@DTOs/UserDTO';
import { LoggerService } from '../services/LoggerService';
import { UserService } from '../services/UserService';

@injectable()
class UserRoutes {
  constructor(
    @inject(LoggerService) private loggerService: LoggerService,
    @inject(UserService) private userService: UserService,
    @inject('App') private app: Application,
  ) {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.use('/static', s(path.join(__dirname, '../views')));
    this.userRoutes();
  }

  private userRoutes() {
    this.app.get('/user', (_: Request, res: Response) => {
      this.userService.createUser('John Doe');
      this.loggerService.log(`Access user`);
      res.status(200).sendFile(path.join(__dirname, '../views/home.html'));
    });

    this.app.post('/user', (req: Request, res: Response) => {
      const { name, age } = req.body;
      const userDTO = new UserDTO(name, age);
      res.status(201).json({ msg: 'User created!', user: userDTO }).end();
    });
  }
}

export default UserRoutes;
