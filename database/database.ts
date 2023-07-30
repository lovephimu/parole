import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  userColor: string;
};

export type Word = {
  id: number;
  targetLanguage: string;
  nativeLanguage: string;
  created: Date;
  repeated: number;
  userId: number;
};

export type Session = {
  id: number;
  token: string;
  userId: number;
};

// USER methods
// USER GET

export const getUsers = cache(async () => {
  const [users] = await sql<User[]>`
SELECT * FROM users
`;
  return users;
});

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
  SELECT
    id, username
  FROM
    users
  WHERE
    users.username = ${username.toLowerCase()}
  `;
  return user;
});

// USER POST

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
  INSERT INTO users
    (username, password_hash)
  VALUES
  (${username.toLowerCase()}, ${passwordHash})
  RETURNING
  id,
  username
  `;

    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.username
  FROM
    users
  INNER JOIN
    session ON (
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > NOW()
    )
  `;

  return user;
});

// SESSION methods
// SESSION GET

export const getValidSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
  DELETE FROM
    sessions
  WHERE
    sessions.token = ${token}
  RETURNING
    id,
    token
  `;
  return session;
});

// SESSION POST

export const createSession = cache(async (token: string, userId: number) => {
  const [session] = await sql<Session[]>`
  INSERT INTO sessions
    (token, user_id)
  VALUES
    (${token},${userId})
  RETURNING
    id,
    token,
    user_id
  `;

  // delete expired sessions

  await deleteExpiredSessions();

  return session;
});

// SESSION DELETE

export const deleteExpiredSessions = cache(async () => {
  await sql`
  DELETE FROM
    sessions
  WHERE
    expiry_timestamp < NOW()
  `;
});

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
DELETE FROM
  sessions
WHERE
  sessions.token = ${token}
RETURNING
  id,
  token
  `;

  return session;
});
