import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "npm:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get the authorization header
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const token = authHeader.replace("Bearer ", "")

    // Verify the user's session
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Get the user's Discord access token
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("discord_access_token")
      .eq("id", user.id)
      .single()

    if (userError || !userData?.discord_access_token) {
      return new Response(
        JSON.stringify({ error: "Discord token not found. Please log in again." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Fetch guilds from Discord API
    const guildsResponse = await fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        "Authorization": `Bearer ${userData.discord_access_token}`
      }
    })

    if (!guildsResponse.ok) {
      if (guildsResponse.status === 401) {
        // Token expired - need to re-auth
        return new Response(
          JSON.stringify({ error: "Discord token expired. Please log in again." }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
      }
      const errorText = await guildsResponse.text()
      console.error("Discord API error:", errorText)
      return new Response(
        JSON.stringify({ error: "Failed to fetch guilds from Discord" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const guilds = await guildsResponse.json()

    // Filter guilds where user has manage permissions (administrator or manage guild)
    // Discord permissions: 0x8 = Administrator, 0x20 = Manage Server
    const manageableGuilds = guilds.filter((guild: any) => {
      const permissions = parseInt(guild.permissions, 10)
      return (permissions & 0x8) === 0x8 || (permissions & 0x20) === 0x20
    }).map((guild: any) => ({
      id: guild.id,
      name: guild.name,
      icon: guild.icon,
      member_count: guild.approximate_member_count || 0,
      has_bot: false, // We'll need to check this separately
      is_owner: guild.owner,
      permissions: (parseInt(guild.permissions, 10) & 0x8) === 0x8 ? "Administrator" : "Manage Server"
    }))

    return new Response(
      JSON.stringify({ guilds: manageableGuilds }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error) {
    console.error("Error in discord-guilds function:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
