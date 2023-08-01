import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FormLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
      <button className="" onClick={async () => await register()}>
        sign up
      </button>
      {error !== '' && <div className="">{error}</div>}
    </form>
  );
}
