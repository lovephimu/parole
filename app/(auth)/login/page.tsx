import FormLogin from '../../components/FormLogin';
import Header from '../../components/Header';

export default function LoginPage() {
  return (
    <main className="font-mono">
      <Header />
      <section className="flex w-full justify-center mt-20">
        <h1 className="text-3xl">Login</h1>
      </section>
      <FormLogin />
    </main>
  );
}
