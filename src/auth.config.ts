import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import prisma from '@/db/prisma';

const prismaAdapter = PrismaAdapter(prisma);
const adapter: Adapter = {
  ...prismaAdapter,
};

import { type Adapter } from '@auth/core/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';

const providers: Provider[] = [GitHub];

export const providerMap = providers
  .map(provider => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter(provider => provider.id !== 'credentials');

export default {
  adapter,
  providers,
  experimental: {
    enableWebAuthn: true,
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
