import { Route } from 'next';
import Link from 'next/link';
import LinkBasicButton from './components/LinkBasicButton';

export default function HomePage() {
  return (
    <main className="flex flex-col h-screen">
      <section className="flex h-full">
        <div className="flex justify-center items-center w-full">
          <h1 className="font-serif text-4xl italic">[ paˈrɔle ]</h1>
        </div>
      </section>
      <section className="flex flex-col gap-1 justify-self-end">
        <LinkBasicButton text="add" link="/enter" />
        <LinkBasicButton text="review" link="/review" />
      </section>
    </main>
  );
}
