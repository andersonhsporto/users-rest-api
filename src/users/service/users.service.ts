import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserDto } from '../dto/user.dto';
import { UserDuplicatedException } from '../exceptions/user-duplicated.exception';
import { Address } from '../entities/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.usersRepository.find();
    return UserDto.fromEntityArray(users);
  }

  async findOne(id: number): Promise<UserDto> {
    const user: User = await this.usersRepository.findOne({
      relations: ['address'],
      where: { id },
    });
    if (!user) {
      throw new UserNotFoundException();
    } else {
      console.log(user.address);
      return UserDto.fromEntity(user);
    }
  }

  async create(userDto: UserDto): Promise<UserDto> {
    if (await this.userExistsByCpf(userDto.cpf)) {
      throw new UserDuplicatedException('User already exists', 409);
    }
    const newAddress: Address = Address.fromUserDto(userDto);
    await this.addressRepository.create(newAddress);
    await this.addressRepository.save(newAddress);

    const newUser: User = User.fromDto(userDto);
    newUser.address = newAddress;

    await this.usersRepository.create(newUser);
    await this.usersRepository.save(newUser);

    return UserDto.fromEntity(newUser);
  }

  async update(id: number, user: User): Promise<UserDto> {
    await this.usersRepository.update({ id }, user);
    const updatedUser: User = await this.usersRepository.findOne({
      where: { id },
    });

    return UserDto.fromEntity(updatedUser);
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

  async deleteAll(): Promise<void> {
    await this.usersRepository.clear();
  }
}
