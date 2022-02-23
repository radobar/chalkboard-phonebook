import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, DeleteResult, UpdateResult } from 'typeorm';

import { CustomHttpException } from '../../../../common/http-exception-filter';
import { ContactRecord } from '../../../../entity/ContactRecord';
import { UpdateContactRequestDto } from '../dto/updateContact.dto';
import { CreateContactRequestDto } from '../dto/createContact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly connection: Connection) {}

  public async getContactById(id: number): Promise<ContactRecord> {
    try {
      const user = await this.connection
        .getRepository(ContactRecord)
        .createQueryBuilder('user')
        .leftJoinAndSelect('contact.userContact', 'userContact')
        .where('contact.id = :id', { id })
        .getOne();

      if (!user) {
        throw new NotFoundException({ EN: 'Contact is not found' });
      }

      return user;
    } catch (e) {
      throw new CustomHttpException(e, {
        EN: 'Error getting contact data',
      });
    }
  }

  public async updateContact(data: UpdateContactRequestDto): Promise<UpdateResult> {
    try {
      const { id, phoneNumbers, ...updateData } = data;

      // todo update phone numbers
      return await this.connection
        .createQueryBuilder()
        .update(ContactRecord)
        .set(updateData)
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      throw new CustomHttpException(e, {
        EN: 'Error updating contact',
      });
    }
  }

  public async createContact(data: CreateContactRequestDto): Promise<UpdateResult> {
    try {
      return await this.connection
        .createQueryBuilder()
        .insert()
        .into(ContactRecord)
        .values(data)
        .execute();
    } catch (e) {
      throw new CustomHttpException(e, {
        EN: 'Error updating contact',
      });
    }
  }

  public async deleteContactById(id: number): Promise<DeleteResult> {
    try {
      return await this.connection
        .createQueryBuilder()
        .delete()
        .from(ContactRecord)
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      throw new CustomHttpException(e, {
        EN: 'Error deleting contact',
      });
    }
  }
}
