import { HttpException } from '@nestjs/common';

export class UserDuplicatedException extends HttpException {
  constructor(str: string, status: number) {
    super(str, status);
  }
}
