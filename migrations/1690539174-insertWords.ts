import { Sql } from 'postgres';
import { Word } from '../database/database';

export const words: Word[] = [
  {
    id: 1,
    targetLanguage: 'fare',
    nativeLanguage: 'machen',
    created: new Date(),
    repeated: 0,
    userId: 1,
  },
];

export async function up(sql: Sql) {
  for (const word of words) {
    await sql`
    INSERT INTO words
    (target_language, native_language, created, repeated, user_id)
    VALUES
    (${word.targetLanguage}, ${word.nativeLanguage}, ${word.created}, ${word.repeated}, ${word.userId})
    `;
  }
}

export async function down(sql: Sql) {
  for (const word of words) {
    await sql`
  DELETE FROM words WHERE id = ${word.id}
  `;
  }
}
