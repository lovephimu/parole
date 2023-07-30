import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE words (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      target_language varchar(150) NOT NULL,
      native_language varchar(150) NOT NULL,
      created timestamp NOT NULL DEFAULT NOW(),
      repeated integer NOT NULL DEFAULT 0,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE words
  `;
}
