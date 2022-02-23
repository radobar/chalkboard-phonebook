import { createConnection, Connection } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { ContactService } from '../modules/_client/contact/services/contact.service';

describe('Contact service tests', () => {
  let contactService: ContactService;
  beforeEach(async () => {
    const options: SqliteConnectionOptions = {
      database: 'sqlite',
      type: 'sqlite',
    };
    const conn = await createConnection(options);
    await conn.connect();
    await conn.dropDatabase();
    await conn.runMigrations();
    contactService = new ContactService(conn);
    // = new ContactService(await createConnection({ type: 'sqlite' }));
  });
  test('should create contact', async () => {
    const contact = await contactService.createContact({
      address: 'test',
      email: 'test@example.com',
      name: 'test',
      phoneNumbers: [],
    });
    // todo fetch contacts
  });
});
