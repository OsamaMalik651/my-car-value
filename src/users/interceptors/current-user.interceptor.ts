import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    console.log(userId);
    if (userId) {
      const user = await this.userService.findOne(userId);
      //assign the user to the request
      request.currentUser = user;
    }
    return handler.handle();
  }
}
