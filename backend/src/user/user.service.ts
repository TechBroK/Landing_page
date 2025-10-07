import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../core/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<User> {
    const isUserExist = await this.userRepository.exists({
      where: {
        email: createUser.email
      }
    })

    if (isUserExist) {
      return null;
    }

    const user: User = this.userRepository.create(createUser);
    user.password = await user.hashPassword(createUser.password);
    return await this.userRepository.save(user);
  }

  async findUserByFields(
    where: FindOneOptions<User>,
    selectedFields: (keyof User)[] = [],
    includes: { [relation: string]: (keyof any)[] } = {},
  ): Promise<Partial<User> | null> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // Apply where conditions
    if (where.where) {
      queryBuilder.where(where.where);
    }

    // Select specific fields from the User entity
    if (selectedFields.length > 0) {
      queryBuilder.select(selectedFields.map((field) => `user.${field}`));
    }

    // Handle includes with specific fields
    for (const relation in includes) {
      const fields = includes[relation].map(
        (field) => `${relation}.${String(field)}`,
      );
      queryBuilder.leftJoinAndSelect(`user.${relation}`, relation);
      fields.forEach((field) => queryBuilder.addSelect(field));
    }

    const user = await queryBuilder.getOne();

    return user ?? null;
  }
}
