import { supabase } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  async function handleSignUp(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    });

    if (!error) {
      redirect('/app/onboarding');
    } else {
      console.error('Sign up error:', error.message);
      // TODO: Handle error in UI
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50">
      <div className="glass p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create Pulse Account</h1>
        
        <form action={handleSignUp} className="space-y-4">
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
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
