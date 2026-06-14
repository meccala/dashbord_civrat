// Discord Support Server Link
export const SUPPORT_DISCORD_URL = 'https://discord.gg/BA3aDFqtXr'

// Discord Bot Invite Link
export const BOT_INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1478877109538652371&permissions=8&integration_type=0&scope=bot+applications.commands'

// Discord Application Credentials
export const DISCORD_CLIENT_ID = '1478877109538652371'
export const DISCORD_CLIENT_SECRET = '3F8rNh0PGFcy4UCD3LLSc--d73C3ZrBr'

// Supabase Configuration
export const SUPABASE_URL = 'https://zxlusbhdibwfilwqobbb.supabase.co'
export const SUPABASE_REDIRECT_URL = `${SUPABASE_URL}/auth/v1/callback`

// Discord API endpoints
export const DISCORD_API_BASE = 'https://discord.com/api/v10'
export const DISCORD_AUTH_URL = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(SUPABASE_REDIRECT_URL)}&response_type=code&scope=identify%20email%20guilds`
