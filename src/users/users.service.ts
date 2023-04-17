import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User whith id ' + id + ' not found');
    } else {
      return user;
    }
  }

  async create(user: User): Promise<User> {
    const newUser: User = await this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update({ id }, user);
    return await this.usersRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const user: User = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User whith id ' + id + ' not found');
    } else {
      await this.usersRepository.delete({ id });
    }
  }
}
