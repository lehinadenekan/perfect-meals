import NextAuth from 'next-auth'
// import { authOptions } from '@/lib/auth' // Ensure this path matches your auth options export
import { authOptions } from '@/auth' // Correct import path

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 