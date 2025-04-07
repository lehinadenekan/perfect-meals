// Type augmentation for next-auth Session
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user']; // Merge with default user properties
  }
}

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
// Re-importing Session and User, keeping DefaultSession for augmentation
import type { DefaultSession, Session, User } from 'next-auth';
// Try importing AuthOptions instead
import type { AuthOptions } from 'next-auth';
// Removed PrismaUser and NextAuthSession imports as they are unused
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

// Add explicit type annotation using AuthOptions
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/', // We're handling sign in via our modal
    error: '/', // We'll handle errors in the modal
  },
  session: {
    strategy: 'database' as const, // Add 'as const' for stricter typing
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    // Explicitly type parameters with imported Session and User
    async session({ session, user }: { session: Session; user: User }) {
      // Add user details to the session object for frontend access
      session.user.id = user.id;
      session.user.name = user.name;
      session.user.image = user.image;
      return session;
    },
  },
}; 