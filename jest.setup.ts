import '@testing-library/jest-dom'
import { server } from './mocks/server'
import { TextEncoder, TextDecoder } from 'util'
import { toHaveNoViolations } from 'jest-axe'
import { PrismaClient } from '@prisma/client'
import { mockDeep } from 'jest-mock-extended'

expect.extend(toHaveNoViolations)

// Extend the NodeJS global type
type CustomNodeJsGlobal = typeof globalThis & {
  TextEncoder: typeof TextEncoder
  TextDecoder: typeof TextDecoder
}

// Polyfill TextEncoder/TextDecoder if they don't exist
const customGlobal = global as CustomNodeJsGlobal
if (typeof customGlobal.TextEncoder === 'undefined') {
  customGlobal.TextEncoder = TextEncoder
}

if (typeof customGlobal.TextDecoder === 'undefined') {
  customGlobal.TextDecoder = TextDecoder
}

// Mock PrismaClient
const mockPrisma = mockDeep<PrismaClient>()
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma)
}))

// Export mockPrisma for use in tests
export { mockPrisma }

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
  jest.clearAllMocks()
})

afterAll(() => {
  server.close()
}) 