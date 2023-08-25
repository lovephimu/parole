'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginResponseBodyPost } from '../api/(auth)/login/route';

export default function FormLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const data: LoginResponseBodyPost = await response.json();

    console.log(data);

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }

    router.push('/enter' as Route);

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

        <button className="mt-8" onClick={async () => await login()}>
          login
        </button>
        {error !== '' && <div className="">{error}</div>}
      </div>
    </form>
  );
}
