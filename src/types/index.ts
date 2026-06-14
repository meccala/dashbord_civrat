export interface Guild {
  id: string
  name: string
  icon: string | null
  owner_id: string
  member_count: number
  features: GuildFeatures
  created_at: string
}

export interface GuildFeatures {
  welcome_goodbye: boolean
  tickets: boolean
  logs: boolean
  auto_mod: boolean
  captcha: boolean
  xp_levels: boolean
  giveaways: boolean
  languages: boolean
  suggestions: boolean
}

export interface WelcomeConfig {
  enabled: boolean
  welcome_channel_id: string | null
  goodbye_channel_id: string | null
  welcome_message: string
  goodbye_message: string
  welcome_embed: EmbedConfig | null
  goodbye_embed: EmbedConfig | null
  dm_welcome: boolean
  dm_message: string
}

export interface TicketConfig {
  enabled: boolean
  category_id: string | null
  support_roles: string[]
  max_tickets_per_user: number
  creation_message: string
  close_message: string
}

export interface LogsConfig {
  enabled: boolean
  channel_id: string | null
  log_messages: boolean
  log_voice: boolean
  log_members: boolean
  log_mod: boolean
  log_server: boolean
}

export interface AutoModConfig {
  enabled: boolean
  log_channel_id: string | null
  mute_role_id: string | null
  filters: AutoModFilters
}

export interface AutoModFilters {
  invite_links: boolean
  spam: boolean
  mass_mention: boolean
  bad_words: boolean
  caps: boolean
  links: boolean
}

export interface CaptchaConfig {
  enabled: boolean
  role_id: string | null
  channel_id: string | null
  captcha_type: 'image' | 'math' | 'button'
  timeout: number
  kick_on_fail: boolean
}

export interface XPConfig {
  enabled: boolean
  message_xp: number
  voice_xp: number
  xp_cooldown: number
  level_up_message: string
  level_up_channel_id: string | null
  role_rewards: RoleReward[]
}

export interface RoleReward {
  level: number
  role_id: string
  keep_previous: boolean
}

export interface GiveawayConfig {
  enabled: boolean
  default_duration: number
  default_winners: number
  default_role_requirement: string | null
}

export interface LanguageConfig {
  default_language: string
  available_languages: string[]
  auto_translate: boolean
}

export interface SuggestionConfig {
  enabled: boolean
  channel_id: string | null
  approved_channel_id: string | null
  denied_channel_id: string | null
  upvote_emoji: string
  downvote_emoji: string
}

export interface EmbedConfig {
  title: string
  description: string
  color: string
  footer: string | null
  image_url: string | null
  thumbnail_url: string | null
  timestamp: boolean
}

export interface DashboardStats {
  total_guilds: number
  active_tickets: number
  total_giveaways: number
  total_xp_users: number
}
