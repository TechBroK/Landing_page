import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeCreatedbyOnCustomerNullable1731505462973
  implements MigrationInterface
{
  name = 'MakeCreatedbyOnCustomerNullable1731505462973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_8f138f284609b045dc64c91757a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "created_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_8f138f284609b045dc64c91757a" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_8f138f284609b045dc64c91757a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ALTER COLUMN "created_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_8f138f284609b045dc64c91757a" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
