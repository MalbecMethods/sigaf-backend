import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
    async create(createUserDto: CreateUserDto) {
    // create user
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
    console.log("Se creo el usuario correctamente");
    return 'Se creo el usuario correctamente'; 
  }

  findAll() {
    const users = this.userRepository.find(
      {
        select: ['id','name','email','password'],
      }
    );

    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
