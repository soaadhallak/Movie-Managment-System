import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserRole } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findByUsername(dto.username);

    if (existing) {
      throw new ConflictException('Username already taken');
    }
    
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new User(
      0,
      dto.username,
      hashedPassword,
      dto.age,
      UserRole.CUSTOMER,
    );

    return this.userRepository.create(user);
  }

  async findByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }
}
