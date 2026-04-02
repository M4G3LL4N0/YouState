import { supabase } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  async function handleSignIn(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (!error) {
      redirect('/app');
    } else {
      console.error('Sign in error:', error.message);
      // TODO: Handle error in UI
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50">
      <div className="glass p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign In to Pulse</h1>
        
        <form action={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link href="/auth/sign-up" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
