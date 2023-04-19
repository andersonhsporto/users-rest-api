import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super('User not found', message);
  }
}
