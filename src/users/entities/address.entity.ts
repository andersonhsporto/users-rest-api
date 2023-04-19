import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn() private _id: number;

  @Column() private _street: string;

  @Column() private _number: number;

  @Column() private _zipCode: string;

  @OneToOne(() => User, (user: User) => user.address) private _user: User;

  get id(): number {
    return this._id;
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get user(): User {
    return this._user;
  }

  static fromUserDto(dto: UserDto): Address {
    const address: Address = new Address();
    address._street = dto.street;
    address._number = dto.number;
    address._zipCode = dto.zipCode;
    return address;
  }
}
