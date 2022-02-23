import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

/*
 *  User password - Qwerty12345;
 */

export default class DatabaseInitSeed1581764511557 implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.transaction(async transactionManager => {
      await transactionManager.query(`INSERT INTO contact_types(name, description) VALUES('mobile', 'Mobile phone');`);
      await transactionManager.query(`INSERT INTO contact_types(name, description) VALUES('work', 'Work phone');`);
      await transactionManager.query(`INSERT INTO contact_types(name, description) VALUES('home', 'Home phone');`);
      await transactionManager.query(`INSERT INTO users(email, password, last_name, first_name, middle_name, birthday, biography, is_locked) VALUES ('admin@gmail.com', '4f0c57d4d1cb96a34c2e43bcdd5d2d6120b4f21d29b41210e5895ba26aebf20710603e6af6133dccf042abee482277008eb638d3683a6b3656aa55a9154aab62', 'Nail', 'Daisy', 'London', '1990-12-12', 'lorem ipsum dolor sit amet', false);`);
      await transactionManager.query(`INSERT INTO users(email, password, last_name, first_name, middle_name, birthday, biography, is_locked) VALUES ('user@gmail.com', '4f0c57d4d1cb96a34c2e43bcdd5d2d6120b4f21d29b41210e5895ba26aebf20710603e6af6133dccf042abee482277008eb638d3683a6b3656aa55a9154aab62', 'Black', 'Alison', 'Drekston', '1990-12-12', 'lorem ipsum dolor sit amet', false);`);
      await transactionManager.query(`INSERT INTO users(email, password, last_name, first_name, middle_name, birthday, biography, is_locked) VALUES ('developer@gmail.com', '4f0c57d4d1cb96a34c2e43bcdd5d2d6120b4f21d29b41210e5895ba26aebf20710603e6af6133dccf042abee482277008eb638d3683a6b3656aa55a9154aab62', 'Kingsman', 'Joanna', 'Layer', '1990-12-12', 'lorem ipsum dolor sit amet', false);`);
      await transactionManager.query(`INSERT INTO user_contacts(value, is_default, user_id, contact_type_id) VALUES('89000000000', true, 1, 1);`);
      await transactionManager.query(`INSERT INTO user_contacts(value, is_default, user_id, contact_type_id) VALUES('89000000111', false, 1, 2);`);
      await transactionManager.query(`INSERT INTO user_contacts(value, is_default, user_id, contact_type_id) VALUES('89000000222', false, 1, 3);`);
      await transactionManager.query(`INSERT INTO user_contacts(value, is_default, user_id, contact_type_id) VALUES('89000000333', true, 2, 1);`);
      await transactionManager.query(`INSERT INTO user_contacts(value, is_default, user_id, contact_type_id) VALUES('89000000444', false, 2, 2);`);
      await transactionManager.query(`INSERT INTO user_contacts(value, is_default, user_id, contact_type_id) VALUES('89000000555', false, 2, 3);`);
      await transactionManager.query(`INSERT INTO user_contacts(value, is_default, user_id, contact_type_id) VALUES('89000000666', true, 3, 1);`);
      await transactionManager.query(`INSERT INTO user_contacts(value, is_default, user_id, contact_type_id) VALUES('89000000777', false, 3, 2);`);
      await transactionManager.query(`INSERT INTO user_contacts(value, is_default, user_id, contact_type_id) VALUES('89000000888', false, 3, 3);`);
    });
  }
}
