import './globals.css';
import type { Metadata } from 'next';
import {
  Roboto_Flex as Sans,
  Roboto_Mono as Mono,
  Tinos as Serif,
} from 'next/font/google';

const sans = Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});
const serif = Serif({
  weight: '400', // or '700'
  style: 'normal', // or 'italic'
  variable: '--font-serif',
  subsets: ['latin'],
});
const mono = Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});
export const metadata: Metadata = {
  title: 'Parole',
  description: 'simplistic vocabulary trainer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-parole-base text-white ${sans.variable} ${mono.variable} ${serif.variable} h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
