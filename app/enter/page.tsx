import { Route } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/database';
import FormEnter from '../components/FormEnter';

async function sessionTest() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) redirect('/login' as Route);

  console.log('got session');

  return session.id;
}

export default async function EnterPage() {
  const userId = await sessionTest();

  return (
    <main>
      <FormEnter userId={userId} />
    </main>
  );
}
