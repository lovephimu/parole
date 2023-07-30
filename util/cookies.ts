import { cookies } from 'next/headers';

export function getCookie(name: string) {
  return cookies().get(name)?.value;
}

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  secure: process.env.Node_ENV === 'production',
  maxAge: 60 * 60 * 24,
  sameSite: 'lax',
} as const;
