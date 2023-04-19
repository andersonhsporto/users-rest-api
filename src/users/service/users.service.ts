import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { IUserDto } from '../dto/user.dto';

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
      throw new UserNotFoundException();
    } else {
      return user;
    }
  }

  async create(userDto: IUserDto): Promise<User> {
    if (this.isDtoEmpty(userDto)) {
      throw new UserNotFoundException();
    } else if (!(await this.userExistsByCpf(userDto.cpf))) {
      throw new UserNotFoundException();
    }
    const newUser: User = await this.usersRepository.create(
      User.fromDto(userDto),
    );
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update({ id }, user);
    return await this.usersRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const user: User = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    } else {
      await this.usersRepository.delete({ id });
    }
  }

  private async userExistsByCpf(cpf: string): Promise<boolean> {
    return await this.usersRepository.exist({ where: { cpf } });
  }

  private isDtoEmpty(userDto: IUserDto): boolean {
    return (
      userDto.name == null ||
      userDto.email == null ||
      userDto.cpf == null ||
      userDto.street == null ||
      userDto.number == null ||
      userDto.zipCode == null
    );
  }
}
