# Authentication Setup Guide

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Discord OAuth
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000  # Update in production
```

## Discord Application Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select an existing one
3. Go to the "OAuth2" section
4. Add a redirect URI: `http://localhost:3000/api/auth/callback/discord`
5. Copy the Client ID and Client Secret to your `.env.local` file
6. Go to the "Bot" section and add a bot to your application
7. Enable the "Server Members Intent" and "Message Content Intent" in the "Privileged Gateway Intents" section

## Bot Invite URL

Create an invite URL with the following scopes:
- `bot`
- `applications.commands`

Required permissions:
- Manage Roles
- Kick Members
- Ban Members
- Manage Nicknames
- Manage Messages
- Read Messages/View Channels
- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Mention @everyone, @here, and All Roles
- Add Reactions

## Server Setup

1. Invite the bot to your server using the generated invite URL
2. Make sure the bot has a role higher than the roles you want it to manage
3. The following role IDs are used in the application:
   - Staff: `1376876672409669672`
   - Trainer: `1376876703808360559`
   - Dashboard: `1377651835715846214`

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Visit `http://localhost:3000`
3. Try to access protected routes to test the authentication flow

## Troubleshooting

- If you get "Invalid OAuth2 state" errors, clear your browser cookies for the site
- Make sure all environment variables are set correctly
- Check the browser console and server logs for any error messages
- Ensure the bot has the correct permissions in your Discord server
