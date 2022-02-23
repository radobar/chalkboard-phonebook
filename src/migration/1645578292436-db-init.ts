import {MigrationInterface, QueryRunner} from "typeorm";

export class dbInit1645578292436 implements MigrationInterface {
    name = 'dbInit1645578292436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_9bb6a85b0216ad7518db120b3e"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_contacts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "is_default" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer, "contact_type_id" integer, CONSTRAINT "UQ_50436a9f6228610239930a25510" UNIQUE ("value"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_contacts"("id", "value", "is_default", "created_at", "updated_at", "user_id", "contact_type_id") SELECT "id", "value", "is_default", "created_at", "updated_at", "user_id", "contact_type_id" FROM "user_contacts"`);
        await queryRunner.query(`DROP TABLE "user_contacts"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_contacts" RENAME TO "user_contacts"`);
        await queryRunner.query(`CREATE INDEX "IDX_9bb6a85b0216ad7518db120b3e" ON "user_contacts" ("value", "contact_type_id") `);
        await queryRunner.query(`DROP INDEX "IDX_9bb6a85b0216ad7518db120b3e"`);
        await queryRunner.query(`CREATE TABLE "phone_number" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL DEFAULT ('home'), "user_contact_id" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_user_contacts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user_contacts"("id") SELECT "id" FROM "user_contacts"`);
        await queryRunner.query(`DROP TABLE "user_contacts"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_contacts" RENAME TO "user_contacts"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_contacts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "address" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user_contacts"("id") SELECT "id" FROM "user_contacts"`);
        await queryRunner.query(`DROP TABLE "user_contacts"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_contacts" RENAME TO "user_contacts"`);
        await queryRunner.query(`CREATE TABLE "temporary_phone_number" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL DEFAULT ('home'), "user_contact_id" integer, CONSTRAINT "FK_985b4ab325282589a95e81b7208" FOREIGN KEY ("user_contact_id") REFERENCES "user_contacts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_phone_number"("id", "type", "user_contact_id") SELECT "id", "type", "user_contact_id" FROM "phone_number"`);
        await queryRunner.query(`DROP TABLE "phone_number"`);
        await queryRunner.query(`ALTER TABLE "temporary_phone_number" RENAME TO "phone_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phone_number" RENAME TO "temporary_phone_number"`);
        await queryRunner.query(`CREATE TABLE "phone_number" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL DEFAULT ('home'), "user_contact_id" integer)`);
        await queryRunner.query(`INSERT INTO "phone_number"("id", "type", "user_contact_id") SELECT "id", "type", "user_contact_id" FROM "temporary_phone_number"`);
        await queryRunner.query(`DROP TABLE "temporary_phone_number"`);
        await queryRunner.query(`ALTER TABLE "user_contacts" RENAME TO "temporary_user_contacts"`);
        await queryRunner.query(`CREATE TABLE "user_contacts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user_contacts"("id") SELECT "id" FROM "temporary_user_contacts"`);
        await queryRunner.query(`DROP TABLE "temporary_user_contacts"`);
        await queryRunner.query(`ALTER TABLE "user_contacts" RENAME TO "temporary_user_contacts"`);
        await queryRunner.query(`CREATE TABLE "user_contacts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "is_default" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer, "contact_type_id" integer, CONSTRAINT "UQ_50436a9f6228610239930a25510" UNIQUE ("value"))`);
        await queryRunner.query(`INSERT INTO "user_contacts"("id") SELECT "id" FROM "temporary_user_contacts"`);
        await queryRunner.query(`DROP TABLE "temporary_user_contacts"`);
        await queryRunner.query(`DROP TABLE "phone_number"`);
        await queryRunner.query(`CREATE INDEX "IDX_9bb6a85b0216ad7518db120b3e" ON "user_contacts" ("value", "contact_type_id") `);
        await queryRunner.query(`DROP INDEX "IDX_9bb6a85b0216ad7518db120b3e"`);
        await queryRunner.query(`ALTER TABLE "user_contacts" RENAME TO "temporary_user_contacts"`);
        await queryRunner.query(`CREATE TABLE "user_contacts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "is_default" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer, "contact_type_id" integer, CONSTRAINT "UQ_50436a9f6228610239930a25510" UNIQUE ("value"), CONSTRAINT "FK_723d7146cb329c4a2a707a7c650" FOREIGN KEY ("contact_type_id") REFERENCES "contact_types" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_a81491e712124db8d5423803ecb" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "user_contacts"("id", "value", "is_default", "created_at", "updated_at", "user_id", "contact_type_id") SELECT "id", "value", "is_default", "created_at", "updated_at", "user_id", "contact_type_id" FROM "temporary_user_contacts"`);
        await queryRunner.query(`DROP TABLE "temporary_user_contacts"`);
        await queryRunner.query(`CREATE INDEX "IDX_9bb6a85b0216ad7518db120b3e" ON "user_contacts" ("value", "contact_type_id") `);
    }

}
