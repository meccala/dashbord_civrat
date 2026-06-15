/*
# Update RLS policies for guild_configs

1. Changes:
- Allow authenticated users to read and update their guild configs
- Enable upsert access for guild_configs table

2. Purpose:
- Enable dashboard to save/load guild configurations
- Allow proper CRUD operations for the authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "select_guild_configs" ON guild_configs;
DROP POLICY IF EXISTS "insert_guild_configs" ON guild_configs;
DROP POLICY IF EXISTS "update_guild_configs" ON guild_configs;

-- Create new policies allowing all authenticated users to manage guild configs
CREATE POLICY "select_guild_configs" ON guild_configs FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_guild_configs" ON guild_configs FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_guild_configs" ON guild_configs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Also update guilds table policies
DROP POLICY IF EXISTS "select_guilds" ON guilds;
DROP POLICY IF EXISTS "insert_guilds" ON guilds;
DROP POLICY IF EXISTS "update_guilds" ON guilds;

CREATE POLICY "select_guilds" ON guilds FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_guilds" ON guilds FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_guilds" ON guilds FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
