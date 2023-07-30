import { Sql } from 'postgres';
import { User } from '../database/database';

export const users: User[] = [
  {
    id: 1,
    username: 'cheekychipper',
    passwordHash:
      '$2b$10$jocJAV1uHwlT2ehYzy2oJuA152UJWtgOc0aRmBdAzuImNpH9J5qi6',
    userColor: '#6DD3CE',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO users
    (username, password_hash, user_color)
    VALUES
    (${user.username}, ${user.passwordHash}, ${user.userColor})
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
  DELETE FROM users WHERE id = ${user.id}
  `;
  }
}
