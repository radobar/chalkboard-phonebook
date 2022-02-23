import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, DeleteResult, UpdateResult } from 'typeorm';

import { CustomHttpException } from '../../../../common/http-exception-filter';
import { User } from '../../../../entity/User';
import { UpdateUserRequestDto } from '../dto/request/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly connection: Connection,
  ) {}

  public async getUserById(id: number): Promise<User> {
    try {
      const user = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userContact', 'userContact')
        .where('user.id = :id', { id })
        .getOne();

      if (!user) {
        throw new NotFoundException({ EN: 'User is not found' });
      }

      return user;
    } catch (e) {
      throw new CustomHttpException(e, {
        EN: 'Error getting user data',
      });
    }
  }

  public async updateUser(id: number, data: UpdateUserRequestDto): Promise<UpdateResult> {
    try {
      return await this.connection
        .createQueryBuilder()
        .update(User)
        .set(data)
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      throw new CustomHttpException(e, {
        EN: 'Error updating user',
      });
    }
  }

  public async deleteUserById(id: number): Promise<DeleteResult> {
    try {
      return await this.connection
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      throw new CustomHttpException(e, {
        EN: 'Error deleting user',
      });
    }
  }
}
