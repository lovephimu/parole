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

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }

    router.push('/add' as Route);

    router.refresh();
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        username:
        <input
          className="authInput"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        password:
        <input
          className="authInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button className="" onClick={async () => await login()}>
        login
      </button>
      {error !== '' && <div className="">{error}</div>}
    </form>
  );
}
