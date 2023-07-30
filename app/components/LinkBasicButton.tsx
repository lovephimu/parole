import { Route } from 'next';
import Link from 'next/link';

type Props = {
  text: string;
  link: string;
};

export default function LinkBasicButton(props: Props) {
  return (
    <section className="bg-parole-dark h-24 w-full">
      <div className="flex justify-center items-center h-full">
        <Link href={`${props.link}` as Route} className="font-mono">
          {props.text}
        </Link>
      </div>
    </section>
  );
}
