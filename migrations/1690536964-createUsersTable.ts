import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(20) NOT NULL,
    password_hash varchar(80) NOT NULL,
    user_color varchar
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
  `;
}
