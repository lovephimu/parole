import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createSession,
  getUserWithPasswordHashByUsername,
  User,
} from '../../../../database/database';
import { secureCookieOptions } from '../../../../util/cookies';

type Error = {
  error: string;
};

export type LoginResponseBodyPost =
  | {
      user: User;
    }
  | Error;

// test schema for user input

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  const body = await request.json();

  // 1. test user input

  const result = userSchema.safeParse(body);

  // 2. verify that username and password are not missing else throw error

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'username or password missing',
      },
      {
        status: 400,
      },
    );
  }

  // 3. compare user credentials with input

  const userWithPasswordHash = await getUserWithPasswordHashByUsername(
    result.data.username,
  );

  // 4. check if there was a valid response

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { error: 'user or password not valid' },
      { status: 401 },
    );
  }

  // 5. hash user input password

  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: 'user or password not valid' },
      { status: 401 },
    );
  }

  // At this point user is authenticated

  // 4. Create a token

  const token = crypto.randomBytes(100).toString('base64');

  // 5. Create the session record

  const session = await createSession(token, userWithPasswordHash.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 6. Create a new cookie

  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json(
    {
      user: {
        username: userWithPasswordHash.username,
        id: userWithPasswordHash.id,
      },
    },
    {
      status: 200,
    },
  );
}
