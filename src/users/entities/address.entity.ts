import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserDto } from '../dto/user.dto';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  zipCode: string;

  static fromUserDto(dto: IUserDto): Address {
    const address: Address = new Address();
    address.street = dto.street;
    address.number = dto.number;
    address.zipCode = dto.zipCode;
    return address;
  }
}
