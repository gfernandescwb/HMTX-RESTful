import { injectable } from 'tsyringe';
import { LoggerService } from './LoggerService';

@injectable()
export class UserService {
  constructor(private loggerService: LoggerService) {}

  createUser(name: string) {
    this.loggerService.log(`User ${name} created.`);
    return { name };
  }
}
