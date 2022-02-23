import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { UserContact } from './UserContact';

@Entity({ name: 'contact_types' })
@Unique(['name'])
export class ContactType {
  constructor(contactType?: Partial<ContactType>) {
    !!contactType && Object.assign(this, contactType);
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @CreateDateColumn({ select: false })
  public readonly createdAt: Date;

  @UpdateDateColumn({ select: false })
  public readonly updatedAt: Date;

  @OneToMany(
    () => UserContact,
    userContact => userContact.contactType,
  )
  public userContact: UserContact[];
}
