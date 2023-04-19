import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../service/users.service';
import { UserDto } from '../dto/user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<UserDto> {
    return await this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<UserDto> {
    console.log(userDto);
    return await this.usersService.create(userDto);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() user: User): Promise<UserDto> {
    return await this.usersService.update(id, user);
  }

  // @Delete('/:id')
  // async delete(@Param('id') id: number): Promise<void> {
  //   return await this.usersService.delete(id);
  // }

  @Delete('/all')
  async deleteAll(): Promise<void> {
    return await this.usersService.deleteAll();
  }
}
