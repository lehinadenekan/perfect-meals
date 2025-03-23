import '@testing-library/jest-dom'
import { server } from './mocks/server'
import { TextEncoder, TextDecoder } from 'util'

// Add type declarations for the global object
declare global {
  var TextEncoder: typeof TextEncoder
  var TextDecoder: typeof TextDecoder
}

// Polyfill TextEncoder/TextDecoder if they don't exist
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder
}

// Mock PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn()
}))

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    query: {},
  }),
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

// MSW Setup
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
}) 