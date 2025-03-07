import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: '63125153558-hup852ul7a7426fh3i05r3qko6uquv26.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    FacebookProvider({
      clientId: '3121965351292535',
      clientSecret: 'b5e832fed42bf922baaccf767c586f96',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions }; 