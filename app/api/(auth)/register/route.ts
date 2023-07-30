import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createSession,
  createUser,
  getUserByUsername,
  User,
} from '../../../../database/database';
import { secureCookieOptions } from '../../../../util/cookies';

type Error = {
  error: string;
};

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | Error;

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);

  // 1. check user input with zod

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'username or password missing',
      },
      { status: 400 },
    );
  }

  // 2. check if username is available

  if (await getUserByUsername(result.data.username)) {
    return NextResponse.json(
      {
        error: 'username is already used',
      },
      { status: 406 },
    );
  }

  // 3. hash the password

  const passwordHash = await bcrypt.hash(result.data.password, 10);

  // 4. store user input in data base

  const newUser = await createUser(result.data.username, passwordHash);

  if (!newUser) {
    return NextResponse.json(
      {
        error: 'Error creating the new user',
      },
      { status: 500 },
    );
  }

  // User is authenticated

  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 6. Create session record

  const session = await createSession(token, newUser.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 7. send the new cookie in the headers

  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // 8. return the new user to the client

  return NextResponse.json({ user: newUser });
}
