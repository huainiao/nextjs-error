import { signIn } from '@/auth';

export default function LoginForm() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <button type='submit'>Sign in</button>
    </form>
  );
}
