// tslint:disable
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1607800308522 implements MigrationInterface {
  name = 'InitDatabase1607800308522';

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "date_reg" datetime NOT NULL DEFAULT (datetime('now')), "last_name" varchar NOT NULL, "first_name" varchar NOT NULL, "middle_name" varchar, "birthday" date NOT NULL, "biography" varchar NOT NULL, "is_locked" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
      await queryRunner.query(`CREATE INDEX "IDX_563c3188039deb1689b2571413" ON "users" ("email", "password") `);
      await queryRunner.query(`CREATE TABLE "user_contacts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "is_default" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer, "contact_type_id" integer, CONSTRAINT "UQ_50436a9f6228610239930a25510" UNIQUE ("value"))`);
      await queryRunner.query(`CREATE INDEX "IDX_9bb6a85b0216ad7518db120b3e" ON "user_contacts" ("value", "contact_type_id") `);
      await queryRunner.query(`CREATE TABLE "contact_types" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_10f3caa7a9f3773f8f25b1167a3" UNIQUE ("name"))`);
      await queryRunner.query(`DROP INDEX "IDX_9bb6a85b0216ad7518db120b3e"`);
      await queryRunner.query(`CREATE TABLE "temporary_user_contacts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "is_default" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer, "contact_type_id" integer, CONSTRAINT "UQ_50436a9f6228610239930a25510" UNIQUE ("value"), CONSTRAINT "FK_a81491e712124db8d5423803ecb" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_723d7146cb329c4a2a707a7c650" FOREIGN KEY ("contact_type_id") REFERENCES "contact_types" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
      await queryRunner.query(`INSERT INTO "temporary_user_contacts"("id", "value", "is_default", "created_at", "updated_at", "user_id", "contact_type_id") SELECT "id", "value", "is_default", "created_at", "updated_at", "user_id", "contact_type_id" FROM "user_contacts"`);
      await queryRunner.query(`DROP TABLE "user_contacts"`);
      await queryRunner.query(`ALTER TABLE "temporary_user_contacts" RENAME TO "user_contacts"`);
      await queryRunner.query(`CREATE INDEX "IDX_9bb6a85b0216ad7518db120b3e" ON "user_contacts" ("value", "contact_type_id") `);
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP INDEX "IDX_9bb6a85b0216ad7518db120b3e"`);
      await queryRunner.query(`ALTER TABLE "user_contacts" RENAME TO "temporary_user_contacts"`);
      await queryRunner.query(`CREATE TABLE "user_contacts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "is_default" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer, "contact_type_id" integer, CONSTRAINT "UQ_50436a9f6228610239930a25510" UNIQUE ("value"))`);
      await queryRunner.query(`INSERT INTO "user_contacts"("id", "value", "is_default", "created_at", "updated_at", "user_id", "contact_type_id") SELECT "id", "value", "is_default", "created_at", "updated_at", "user_id", "contact_type_id" FROM "temporary_user_contacts"`);
      await queryRunner.query(`DROP TABLE "temporary_user_contacts"`);
      await queryRunner.query(`CREATE INDEX "IDX_9bb6a85b0216ad7518db120b3e" ON "user_contacts" ("value", "contact_type_id") `);
      await queryRunner.query(`DROP TABLE "contact_types"`);
      await queryRunner.query(`DROP INDEX "IDX_9bb6a85b0216ad7518db120b3e"`);
      await queryRunner.query(`DROP TABLE "user_contacts"`);
      await queryRunner.query(`DROP INDEX "IDX_563c3188039deb1689b2571413"`);
      await queryRunner.query(`DROP TABLE "users"`);
    }

}
