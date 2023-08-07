'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../api/(auth)/register/route';

export default function FormRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    console.log(data.user);
    // router.push(`/profile/${data.user.username}`);
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="flex flex-col w-full items-center font-mono mt-16">
        <label className="text-xl pb-8" htmlFor="username">
          Username:
        </label>

        <input
          id="username"
          className="authInput pb-8 mb-8 w-3/4"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />

        <label className="text-xl pb-8" htmlFor="password">
          Password:
        </label>

        <input
          id="password"
          className="authInput pb-8 mb-8 w-3/4"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />

        <button className="mt-8" onClick={async () => await register()}>
          sign up
        </button>
        {error !== '' && <div className="">{error}</div>}
      </div>
    </form>
  );
}
