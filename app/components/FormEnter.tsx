'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { WordCreationResponseBody } from '../api/words/route';

type Props = {
  userId: number;
};

export default function FormEnter(props: Props) {
  const [targetWord, setTargetWord] = useState('');
  const [baseWord, setBaseWord] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function enterWord() {
    const test = props.userId;
    const response = await fetch('/api/words', {
      method: 'POST',
      body: JSON.stringify({
        targetLanguage: targetWord,
        nativeLanguage: baseWord,
        userId: props.userId,
      }),
    });
    const data: WordCreationResponseBody = await response.json();

    if ('error' in data) {
      setError;
    }
  }

  return (
    <section>
      <section className="flex flex-col w-full items-center mt-16">
        <h1 className="font-mono text-3xl">Enter Vocabulary</h1>
        <div className="mt-16 font-mono text-xl w-full flex justify-center flex-col items-center">
          <h2 className="text-center pb-4">Target Language</h2>
          <label htmlFor="targetLanguage" />
          <input
            id="targetLanguage"
            className="authInput  pb-8 w-3/4"
            value={targetWord}
            onChange={(event) => setTargetWord(event.currentTarget.value)}
          />
        </div>
        <div className="mt-16 font-mono text-xl w-full flex justify-center flex-col items-center">
          <h2 className="text-center pb-4">Base Language</h2>
          <input
            id="baseLanguage"
            className="authInput pb-8 w-3/4"
            value={baseWord}
            onChange={(event) => setBaseWord(event.currentTarget.value)}
          />
        </div>
        <button className="mt-16" onClick={async () => await enterWord()}>
          Save
          <div className="bg-parole-dark h-24 w-full">
            <div className="flex justify-center items-center h-full">Save</div>
          </div>
        </button>
      </section>
    </section>
  );
}
