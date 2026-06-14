import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Bot, Search, ArrowRight } from 'lucide-react'

interface GuildData {
  id: string
  name: string
  icon: string | null
  member_count: number
  has_bot: boolean
}

const mockGuilds: GuildData[] = [
  { id: '1', name: 'Gaming Community', icon: null, member_count: 15420, has_bot: true },
  { id: '2', name: 'Crypto Traders', icon: null, member_count: 8500, has_bot: true },
  { id: '3', name: 'Music Lovers', icon: null, member_count: 3200, has_bot: false },
  { id: '4', name: 'Developer Hub', icon: null, member_count: 12000, has_bot: true },
  { id: '5', name: 'Art Gallery', icon: null, member_count: 750, has_bot: false },
]

export default function GuildSelector() {
  const [guilds] = useState<GuildData[]>(mockGuilds)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filteredGuilds = guilds.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelectGuild = (guild: GuildData) => {
    navigate(`/dashboard/${guild.id}/welcome`)
  }

  return (
    <div className="min-h-screen bg-discord-darker p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Select a </span>
            <span className="neon-text">Server</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Choose a server to manage your CIVRAT settings.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search servers..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
          />
        </div>

        {/* Guild Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredGuilds.map((guild, index) => (
            <motion.div
              key={guild.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelectGuild(guild)}
              className="glass-card-hover p-6 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-green/20 to-accent-yellow/20 flex items-center justify-center text-2xl font-bold text-white">
                  {guild.icon ? (
                    <img
                      src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                      alt={guild.name}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    guild.name.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white truncate">{guild.name}</h3>
                    {guild.has_bot && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-neon-green/10 rounded-full">
                        <Bot className="w-3 h-3 text-neon-green" />
                        <span className="text-xs text-neon-green font-medium">Added</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">
                    {guild.member_count.toLocaleString()} members
                  </p>
                </div>

                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-neon-green group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGuilds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No servers found matching "{search}"</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
