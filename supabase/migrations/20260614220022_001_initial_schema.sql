-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  discord_id TEXT,
  discord_username TEXT,
  discord_avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guilds table
CREATE TABLE IF NOT EXISTS guilds (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  owner_id TEXT NOT NULL,
  member_count INTEGER DEFAULT 0,
  features JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guild configs table
CREATE TABLE IF NOT EXISTS guild_configs (
  guild_id TEXT PRIMARY KEY REFERENCES guilds(id) ON DELETE CASCADE,
  welcome_config JSONB DEFAULT '{}',
  ticket_config JSONB DEFAULT '{}',
  logs_config JSONB DEFAULT '{}',
  auto_mod_config JSONB DEFAULT '{}',
  captcha_config JSONB DEFAULT '{}',
  xp_config JSONB DEFAULT '{}',
  giveaway_config JSONB DEFAULT '{}',
  language_config JSONB DEFAULT '{}',
  suggestion_config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE guilds ENABLE ROW LEVEL SECURITY;
ALTER TABLE guild_configs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "select_own_user" ON users FOR SELECT
  TO authenticated USING (auth.uid() = id);
CREATE POLICY "insert_own_user" ON users FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "update_own_user" ON users FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- RLS Policies for guilds
CREATE POLICY "select_guilds" ON guilds FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "insert_guilds" ON guilds FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "update_guilds" ON guilds FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for guild_configs
CREATE POLICY "select_guild_configs" ON guild_configs FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "insert_guild_configs" ON guild_configs FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "update_guild_configs" ON guild_configs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_discord_id ON users(discord_id);
CREATE INDEX IF NOT EXISTS idx_guilds_owner_id ON guilds(owner_id);
