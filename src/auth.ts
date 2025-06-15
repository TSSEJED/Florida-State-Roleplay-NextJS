import NextAuth, { type DefaultSession, type NextAuthConfig } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

// Temporary config - replace with your actual config
const config = {
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID || '',
    clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    guildId: '1271521823259099138',
  },
  app: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  },
};

// Extend the built-in session and user types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      roles?: string[];
    } & DefaultSession['user'];
  }

  interface User {
    roles?: string[];
  }
}

// Define a custom JWT type
type JWTWithRole = {
  sub?: string;
  roles?: string[];
  [key: string]: unknown;
};

export const authConfig: NextAuthConfig = {
  providers: [
    DiscordProvider({
      clientId: config.discord.clientId,
      clientSecret: config.discord.clientSecret,
      authorization: {
        params: {
          scope: 'identify email guilds.members.read',
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.avatar 
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` 
            : null,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        const typedToken = token as JWTWithRole;
        if (typedToken.roles) {
          session.user.roles = typedToken.roles;
        }
      }
      return session;
    },
    async jwt({ token, account, user, trigger, session }) {
      const typedToken = token as JWTWithRole;
      
      // Initial sign in
      if (account && user) {
        typedToken.roles = [];
      }

      // Only fetch roles if we have an access token
      if (account?.access_token) {
        try {
          const response = await fetch(
            `https://discord.com/api/users/@me/guilds/1271521823259099138/member`,
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );

          if (response.ok) {
            const memberData = await response.json();
            typedToken.roles = memberData.roles || [];
          }
        } catch (error) {
          console.error('Error fetching Discord member data:', error);
        }
      }
      return typedToken;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: config.app.nextAuthSecret,
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
};

// Export the auth handlers for the API routes
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const { GET, POST } = handlers;
