import { MigrationInterface, QueryRunner } from 'typeorm';

export class dbInit1645579846809 implements MigrationInterface {
  name = 'dbInit1645579846809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "phone_number"
                             (
                                 "id"              integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                 "number"          varchar NOT NULL,
                                 "type"            varchar NOT NULL DEFAULT ('home'),
                                 "user_contact_id" integer
                             )`);
    await queryRunner.query(`CREATE TABLE "contact_record"
                             (
                                 "id"      integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                 "name"    varchar NOT NULL,
                                 "email"   varchar NOT NULL,
                                 "address" varchar NOT NULL
                             )`);
    await queryRunner.query(`CREATE TABLE "temporary_phone_number"
                             (
                                 "id"              integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                 "number"          varchar NOT NULL,
                                 "type"            varchar NOT NULL DEFAULT ('home'),
                                 "user_contact_id" integer,
                                 CONSTRAINT "FK_985b4ab325282589a95e81b7208" FOREIGN KEY ("user_contact_id") REFERENCES "contact_record" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
                             )`);
    await queryRunner.query(`INSERT INTO "temporary_phone_number"("id", "number", "type", "user_contact_id")
                             SELECT "id", "number", "type", "user_contact_id"
                             FROM "phone_number"`);
    await queryRunner.query(`DROP TABLE "phone_number"`);
    await queryRunner.query(`ALTER TABLE "temporary_phone_number"
        RENAME TO "phone_number"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "phone_number"
        RENAME TO "temporary_phone_number"`);
    await queryRunner.query(`CREATE TABLE "phone_number"
                             (
                                 "id"              integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                                 "number"          varchar NOT NULL,
                                 "type"            varchar NOT NULL DEFAULT ('home'),
                                 "user_contact_id" integer
                             )`);
    await queryRunner.query(`INSERT INTO "phone_number"("id", "number", "type", "user_contact_id")
                             SELECT "id", "number", "type", "user_contact_id"
                             FROM "temporary_phone_number"`);
    await queryRunner.query(`DROP TABLE "temporary_phone_number"`);
    await queryRunner.query(`DROP TABLE "contact_record"`);
    await queryRunner.query(`DROP TABLE "phone_number"`);
  }
}
