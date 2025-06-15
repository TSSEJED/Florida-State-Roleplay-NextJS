// Environment variables configuration
export const config = {
  // Discord OAuth2
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID || '',
    clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    // The ID of the server where we'll check for the role
    guildId: '1377651835715846214',
    // The required role ID for dashboard access
    requiredRoleId: '1377651835715846214',
  },
  // Application settings
  app: {
    // Base URL for the application
    baseUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    // Secret for NextAuth (generate with: openssl rand -base64 32)
    nextAuthSecret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  },
};
