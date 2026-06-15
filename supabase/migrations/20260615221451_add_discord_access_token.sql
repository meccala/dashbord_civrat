/*
# Add Discord access token storage

1. Changes:
- Add `discord_access_token` column to users table for storing OAuth token
- Add `discord_token_expires_at` column for token expiration
- Add `discord_refresh_token` column for token refresh

2. Purpose:
- Enables fetching user's Discord guilds via Discord API
- Required for guild selection functionality
*/

ALTER TABLE users ADD COLUMN IF NOT EXISTS discord_access_token TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS discord_token_expires_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS discord_refresh_token TEXT;
