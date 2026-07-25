import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/database/prisma.service";

import {
  UserRepository
} from "../../domain/repositories/user.repository";

import {
  User,
  UserRole
} from "../../domain/entities/user.entity";



@Injectable()
export class PrismaUserRepository
  extends UserRepository {


  constructor(
    private readonly prisma: PrismaService
  ) {
    super();
  }



  async create(user: User): Promise<User> {
    const created =
      await this.prisma.user.create({
        data: {
          username: user.username,
          password: user.password,
          age: user.age,
          role: user.role
        }
      });

    return new User(
      created.id,
      created.username,
      created.password,
      created.age,
      created.role as UserRole,
      created.createdAt
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          username
        }
      });

    if (!user)
      return null;

    return new User(
      user.id,
      user.username,
      user.password,
      user.age,
      user.role as UserRole,
      user.createdAt
    );
  }

  async findById(id: number): Promise<User | null> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id
        }
      });

    if (!user)
      return null;

    return new User(
      user.id,
      user.username,
      user.password,
      user.age,
      user.role as UserRole,
      user.createdAt
    );
  }

}