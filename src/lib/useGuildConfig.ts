import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from './supabase'
import { useI18n } from './i18n'

interface GuildConfig {
  id?: string
  guild_id: string
  welcome_config: Record<string, any>
  ticket_config: Record<string, any>
  logs_config: Record<string, any>
  auto_mod_config: Record<string, any>
  captcha_config: Record<string, any>
  xp_config: Record<string, any>
  giveaway_config: Record<string, any>
  suggestion_config: Record<string, any>
  language_config: Record<string, any>
  invite_config: Record<string, any>
  security_config: Record<string, any>
  anti_nuke_config: Record<string, any>
  temp_voice_config: Record<string, any>
  analytics_config: Record<string, any>
  embed_builder_config: Record<string, any>
  backup_config: Record<string, any>
  settings_config: Record<string, any>
}

type ConfigKey = keyof Omit<GuildConfig, 'id' | 'guild_id'>

export function useGuildConfig<T extends Record<string, any>>(
  configKey: ConfigKey,
  defaultConfig: T
) {
  const { guildId } = useParams<{ guildId: string }>()
  const { t } = useI18n()
  const [config, setConfig] = useState<T>(defaultConfig)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load config on mount
  useEffect(() => {
    async function loadConfig() {
      if (!supabase || !guildId) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const { data, error: loadError } = await supabase
          .from('guild_configs')
          .select('*')
          .eq('guild_id', guildId)
          .maybeSingle()

        if (loadError) {
          console.error('Error loading config:', loadError)
          setError(t('common.loadError'))
        } else if (data) {
          const configValue = data[configKey]
          if (configValue && typeof configValue === 'object') {
            setConfig({ ...defaultConfig, ...configValue as T })
          }
        }
      } catch (err) {
        console.error('Failed to load config:', err)
        setError(t('common.loadError'))
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [guildId, configKey, defaultConfig, t])

  // Save config function
  const saveConfig = useCallback(async () => {
    if (!supabase || !guildId) {
      setError(t('common.saveError'))
      return false
    }

    setSaving(true)
    setSaveSuccess(false)
    setError(null)

    try {
      // Check if guild exists in guild_configs
      const { data: existing, error: checkError } = await supabase
        .from('guild_configs')
        .select('guild_id')
        .eq('guild_id', guildId)
        .maybeSingle()

      if (checkError) {
        console.error('Error checking config:', checkError)
      }

      const configData = { [configKey]: config }

      let result
      if (existing) {
        // Update existing
        result = await supabase
          .from('guild_configs')
          .update({
            ...configData,
            updated_at: new Date().toISOString()
          })
          .eq('guild_id', guildId)
      } else {
        // Insert new - need to create guild first
        await supabase
          .from('guilds')
          .upsert({
            id: guildId,
            name: 'Server',
            owner_id: 'unknown',
          })

        result = await supabase
          .from('guild_configs')
          .insert({
            guild_id: guildId,
            ...configData
          })
      }

      if (result.error) {
        console.error('Error saving config:', result.error)
        setError(t('common.saveError'))
        return false
      }

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      return true
    } catch (err) {
      console.error('Failed to save config:', err)
      setError(t('common.saveError'))
      return false
    } finally {
      setSaving(false)
    }
  }, [supabase, guildId, configKey, config, t])

  // Reset to default
  const resetConfig = useCallback(() => {
    setConfig(defaultConfig)
  }, [defaultConfig])

  // Update partial config
  const updateConfig = useCallback((updates: Partial<T>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }, [])

  return {
    config,
    setConfig,
    updateConfig,
    saveConfig,
    resetConfig,
    loading,
    saving,
    saveSuccess,
    error,
    guildId
  }
}
