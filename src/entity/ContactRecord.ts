import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PhoneNumber } from './PhoneNumber';

@Entity({ name: 'contact_record' })
export class ContactRecord {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @OneToMany(
    () => PhoneNumber,
    contactType => contactType.userContact,
  )
  public phoneNumbers: PhoneNumber[];

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public address: string;
}
