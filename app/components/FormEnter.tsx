'use client';

import { useState } from 'react';

export default function FormEnter() {
  const [targetWord, setTargetWord] = useState('');
  const [baseWord, setBaseWord] = useState('');
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
        <button className="mt-16">Save</button>
      </section>
    </section>
  );
}
