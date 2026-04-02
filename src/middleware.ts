import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to sign-in if trying to access app without session
  if (!session && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  // Redirect to app if trying to access auth pages with session
  if (session && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/app', request.url));
  }

  // Check onboarding status for app routes
  if (session && request.nextUrl.pathname.startsWith('/app')) {
    const { data: profile } = await supabase
      .from('pulse.profiles')
      .select('id')
      .eq('user_id', session.user.id)
      .single();

    // Redirect to onboarding if profile not complete
    if (!profile && !request.nextUrl.pathname.startsWith('/app/onboarding')) {
      return NextResponse.redirect(new URL('/app/onboarding', request.url));
    }
  }

  return response;
}
