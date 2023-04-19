import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';

export class UserDto {
  private _name: string;
  private _email: string;
  private _cpf: string;
  private _street: string;
  @Exclude({ toPlainOnly: true })
  private _password: string;
  private _number: number;
  private _zipCode: string;

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get cpf(): string {
    return this._cpf;
  }

  get street(): string {
    return this._street;
  }

  get password(): string {
    return this._password;
  }

  get number(): number {
    return this._number;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  public static fromEntity(user: User): UserDto {
    const userDto: UserDto = new UserDto();
    userDto._name = user.name;
    userDto._email = user.email;
    userDto._cpf = user.cpf;
    userDto._street = user.address.street;
    userDto._password = user.password;
    userDto._number = user.address.number;
    userDto._zipCode = user.address.zipCode;
    return userDto;
  }

  public static fromEntityArray(users: User[]): UserDto[] {
    return users.map((user: User) => UserDto.fromEntity(user));
  }
}
