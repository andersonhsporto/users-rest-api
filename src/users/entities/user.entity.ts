import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { IUserDto } from '../dto/user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  static fromDto(dto: IUserDto): User {
    const user: User = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.cpf = dto.cpf;
    user.password = dto.password;
    user.address = Address.fromUserDto(dto);
    return user;
  }
}
