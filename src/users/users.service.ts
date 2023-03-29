import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UnathorizedError } from 'src/common/errors/types/UnathorizedError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    throw new UnathorizedError('Não autorizado.');
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user =  await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado.");
    } else {
      return user;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.remove(id);
  }
}
