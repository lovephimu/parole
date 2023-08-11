import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createWord, Word } from '../../../database/database';

type Error = {
  error: string;
};

export type WordCreationResponseBody =
  | {
      word: Word;
    }
  | Error;

// test schema for user input

const inputSchema = z.object({
  targetLanguage: z.string().min(1),
  nativeLanguage: z.string().min(1),
  userId: z.number().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<WordCreationResponseBody>> {
  const body = await request.json();

  // 1. test user input

  const result = inputSchema.safeParse(body);

  // 2. Handle input error

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Vocabulary input not complete',
      },
      {
        status: 400,
      },
    );
  }

  // 2a. create a creation date

  const creationDate = new Date();

  // 3. Save word in database

  const newVocabulary = await createWord(
    result.data.targetLanguage,
    result.data.nativeLanguage,
    creationDate,
    result.data.userId,
  );

  if (!newVocabulary) {
    return NextResponse.json(
      {
        error: 'Error creating word in the database',
      },
      { status: 500 }, // Internal Server Error status
    );
  }

  return NextResponse.json(
    {
      word: newVocabulary,
    },
    { status: 200 },
  );
}
