import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma" // Assuming prisma client instance is exported from lib/prisma.ts
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import type { Adapter } from "next-auth/adapters"
import type { DefaultSession } from "next-auth" // Import DefaultSession for augmentation
// Removed unused v5 type imports for Session/User as augmentation handles it

// Define auth config according to v5 structure
// Note: Session strategy is defined differently in v5, often via adapter/JWT.
// Custom pages are usually handled by middleware or component logic.
// Callback logic is also slightly different.
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    // The `session` callback modifies the session object available client-side
    async session({ session, user }) {
      // Add user id to the session object
      if (session.user && user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
    // Add other callbacks like jwt, signIn as needed
  },
  // Add pages configuration if needed, though v5 handles this differently
  // pages: { ... }
  // Add cookies configuration if needing customization beyond defaults
  // cookies: { ... }

  // Add debug flag for development if helpful
  // debug: process.env.NODE_ENV === 'development',
})

// Type Augmentation following Auth.js v5 pattern
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string
    } & DefaultSession["user"] // Add the id to the default user type
  }
}

// Note: You might need to adjust `./prisma` import based on your project structure.
// Ensure environment variables are non-null or handle potential undefined values. 