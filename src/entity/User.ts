import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { UserContact } from './UserContact';

@Entity({ name: 'users' })
@Unique(['email'])
@Index(['email', 'password'])
export class User {
  constructor(user?: Partial<User>) {
    !!user && Object.assign(this, user);
  }

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  @CreateDateColumn()
  public dateReg: Date;

  @Column()
  public lastName: string;

  @Column()
  public firstName: string;

  @Column({ nullable: true })
  public middleName: string;

  @Column({ type: 'date' })
  public birthday: Date;

  @Column()
  public biography: string;

  @Column({ default: false })
  public isLocked: boolean;

  @CreateDateColumn({ select: false })
  public readonly createdAt: Date;

  @UpdateDateColumn({ select: false })
  public readonly updatedAt: Date;

  @OneToMany(
    () => UserContact,
    userContact => userContact.user,
  )
  public userContact: UserContact[];
}
