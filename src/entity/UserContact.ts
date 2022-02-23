import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { ContactType } from './ContactType';
import { User } from './User';

@Entity({ name: 'user_contacts' })
@Unique(['value'])
@Index(['value', 'contactType'])
export class UserContact {
  constructor(userContact?: Partial<UserContact>) {
    !!userContact && Object.assign(this, userContact);
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ManyToOne(
    () => User,
    user => user.userContact,
    { onDelete: 'CASCADE' },
  )
  public user: User;

  @ManyToOne(
    () => ContactType,
    contactType => contactType.userContact,
    { onDelete: 'CASCADE' },
  )
  public contactType: ContactType;

  @Column()
  public value: string;

  @Column({ default: false })
  public isDefault: boolean;

  @Exclude()
  @CreateDateColumn({ select: false })
  public readonly createdAt: Date;

  @UpdateDateColumn({ select: false })
  public readonly updatedAt: Date;
}
