import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};

export const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

export const mockPrismaClient = jest.fn(() => prismaMock);

export const Prisma = {
  ModelName: {
    Recipe: 'recipe',
    User: 'user',
    UserPreference: 'userPreference'
  }
};

// For CommonJS compatibility
const prismaMockExports = {
  prismaMock,
  PrismaClient: mockPrismaClient,
  Prisma
};

export default prismaMockExports; 