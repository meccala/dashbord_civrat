import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Language = 'fr' | 'en'

interface Translations {
  [key: string]: {
    fr: string
    en: string
  }
}

const translations: Translations = {
  // Landing Page
  'landing.hero.title': { fr: 'Le Bot Discord Ultime', en: 'The Ultimate Discord Bot' },
  'landing.hero.subtitle': { fr: 'Fonctionnalités puissantes, tableau de bord magnifique, contrôle total de votre serveur Discord.', en: 'Powerful features, stunning dashboard, complete control over your Discord server.' },
  'landing.hero.getStarted': { fr: 'Commencer Gratuitement', en: 'Get Started Free' },
  'landing.hero.viewFeatures': { fr: 'Voir les Fonctionnalités', en: 'View Features' },
  'landing.stats.servers': { fr: 'Serveurs', en: 'Servers' },
  'landing.stats.users': { fr: 'Utilisateurs', en: 'Users' },
  'landing.stats.uptime': { fr: 'Disponibilité', en: 'Uptime' },
  'landing.stats.support': { fr: 'Support', en: 'Support' },
  'landing.features.title': { fr: 'Fonctionnalités Puissantes', en: 'Powerful Features' },
  'landing.features.subtitle': { fr: 'Tout ce dont vous avez besoin pour gérer et développer votre communauté Discord.', en: 'Everything you need to manage and grow your Discord community.' },
  'landing.features.welcome.title': { fr: 'Bienvenue & Départ', en: 'Welcome & Goodbye' },
  'landing.features.welcome.desc': { fr: 'Personnalisez les messages d\'arrivée et de départ avec des embeds enrichis.', en: 'Customize member join and leave messages with rich embeds.' },
  'landing.features.tickets.title': { fr: 'Système de Tickets', en: 'Ticket System' },
  'landing.features.tickets.desc': { fr: 'Système de support professionnel avec transcripts et catégories.', en: 'Professional support system with transcripts and categories.' },
  'landing.features.automod.title': { fr: 'Auto Modération', en: 'Auto Moderation' },
  'landing.features.automod.desc': { fr: 'Protégez votre serveur avec des filtres automod puissants.', en: 'Protect your server with powerful automod filters.' },
  'landing.features.xp.title': { fr: 'XP & Niveaux', en: 'XP & Levels' },
  'landing.features.xp.desc': { fr: 'Engagez les membres avec un système de niveaux interactif.', en: 'Engage members with an interactive leveling system.' },
  'landing.features.giveaways.title': { fr: 'Concours', en: 'Giveaways' },
  'landing.features.giveaways.desc': { fr: 'Créez et gérez des concours passionnants pour votre serveur.', en: 'Create and manage exciting server giveaways.' },
  'landing.features.stats.title': { fr: 'Statistiques Avancées', en: 'Advanced Stats' },
  'landing.features.stats.desc': { fr: 'Suivez la croissance du serveur et l\'activité des membres en temps réel.', en: 'Track server growth and member activity in real-time.' },
  'landing.cta.title': { fr: 'Prêt à booster votre serveur ?', en: 'Ready to supercharge your server?' },
  'landing.cta.subtitle': { fr: 'Rejoignez des milliers de propriétaires qui font confiance à CIVRAT.', en: 'Join thousands of server owners who trust CIVRAT.' },
  'landing.cta.button': { fr: 'Commencer Maintenant', en: 'Get Started Now' },
  'landing.login': { fr: 'Connexion Discord', en: 'Login with Discord' },
  'landing.footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.' },

  // Guild Selector
  'guild.title': { fr: 'Sélectionnez un Serveur', en: 'Select a Server' },
  'guild.subtitle': { fr: 'Choisissez un serveur pour configurer les paramètres CIVRAT.', en: 'Choose a server to manage your CIVRAT settings.' },
  'guild.search': { fr: 'Rechercher des serveurs...', en: 'Search servers...' },
  'guild.members': { fr: 'membres', en: 'members' },
  'guild.added': { fr: 'Ajouté', en: 'Added' },
  'guild.noResults': { fr: 'Aucun serveur trouvé pour', en: 'No servers found for' },
  'guild.adminOnly': { fr: 'Serveurs administrateurs uniquement', en: 'Admin servers only' },
  'guild.adminOnlyDesc': { fr: 'Seuls les serveurs où vous avez les permissions "Administrateur" ou "Gérer le serveur" sont affichés. Si un serveur manque, vérifiez vos permissions sur Discord.', en: 'Only servers where you have "Administrator" or "Manage Server" permissions are shown. If a server is missing, check your Discord permissions.' },

  // Dashboard Navigation
  'nav.welcome': { fr: 'Bienvenue & Départ', en: 'Welcome & Goodbye' },
  'nav.tickets': { fr: 'Tickets', en: 'Tickets' },
  'nav.logs': { fr: 'Logs', en: 'Logs' },
  'nav.autoMod': { fr: 'Auto Modération', en: 'Auto Moderation' },
  'nav.captcha': { fr: 'Captcha', en: 'Captcha' },
  'nav.xp': { fr: 'XP & Niveaux', en: 'XP & Levels' },
  'nav.giveaways': { fr: 'Concours', en: 'Giveaways' },
  'nav.languages': { fr: 'Langues', en: 'Languages' },
  'nav.suggestions': { fr: 'Suggestions', en: 'Suggestions' },
  'nav.invites': { fr: 'Suivi des Invitations', en: 'Invite Tracking' },
  'nav.security': { fr: 'Sécurité', en: 'Security' },
  'nav.antiNuke': { fr: 'Anti Nuke', en: 'Anti Nuke' },
  'nav.tempVoice': { fr: 'Salons Vocaux Temp.', en: 'Temp Voice' },
  'nav.analytics': { fr: 'Analytiques', en: 'Analytics' },
  'nav.embedBuilder': { fr: 'Créateur d\'Embed', en: 'Embed Builder' },
  'nav.backups': { fr: 'Sauvegardes', en: 'Backups' },
  'nav.settings': { fr: 'Paramètres', en: 'Settings' },
  'nav.premium': { fr: 'Premium', en: 'Premium' },
  'nav.signOut': { fr: 'Déconnexion', en: 'Sign Out' },
  'nav.administrator': { fr: 'Administrateur', en: 'Administrator' },

  // Common
  'common.save': { fr: 'Enregistrer', en: 'Save Changes' },
  'common.reset': { fr: 'Réinitialiser', en: 'Reset to Default' },
  'common.preview': { fr: 'Aperçu', en: 'Preview' },
  'common.enabled': { fr: 'Activé', en: 'Enabled' },
  'common.disabled': { fr: 'Désactivé', en: 'Disabled' },
  'common.selectChannel': { fr: 'Sélectionner un salon', en: 'Select a channel' },
  'common.selectRole': { fr: 'Sélectionner un rôle', en: 'Select a role' },
  'common.none': { fr: 'Aucun (Tout le monde)', en: 'None (Everyone)' },

  // Welcome Module
  'welcome.title': { fr: 'Bienvenue & Départ', en: 'Welcome & Goodbye' },
  'welcome.subtitle': { fr: 'Configurez les messages d\'arrivée et de départ des membres.', en: 'Configure member join and leave messages.' },
  'welcome.enableTitle': { fr: 'Activer le Système de Bienvenue', en: 'Enable Welcome System' },
  'welcome.enableDesc': { fr: 'Accueillir automatiquement les nouveaux membres', en: 'Automatically greet new members' },
  'welcome.welcomeMessage': { fr: 'Message de Bienvenue', en: 'Welcome Message' },
  'welcome.welcomeChannel': { fr: 'Salon de Bienvenue', en: 'Welcome Channel' },
  'welcome.goodbyeMessage': { fr: 'Message de Départ', en: 'Goodbye Message' },
  'welcome.goodbyeChannel': { fr: 'Salon de Départ', en: 'Goodbye Channel' },
  'welcome.dmWelcome': { fr: 'Bienvenue en MP', en: 'DM Welcome' },
  'welcome.dmDesc': { fr: 'Envoyer un message privé aux nouveaux membres', en: 'Send a direct message to new members' },
  'welcome.dmMessage': { fr: 'Message en MP', en: 'DM Message' },
  'welcome.variables': { fr: 'Variables : {user}, {server}, {member_count}', en: 'Variables: {user}, {server}, {member_count}' },

  // Tickets Module
  'tickets.title': { fr: 'Système de Tickets', en: 'Ticket System' },
  'tickets.subtitle': { fr: 'Configurez les tickets de support pour votre serveur.', en: 'Configure support tickets for your server.' },
  'tickets.enable': { fr: 'Activer les Tickets', en: 'Enable Ticket System' },
  'tickets.enableDesc': { fr: 'Permettre aux membres de créer des tickets de support', en: 'Allow members to create support tickets' },
  'tickets.basicSettings': { fr: 'Paramètres de Base', en: 'Basic Settings' },
  'tickets.category': { fr: 'Catégorie des Tickets', en: 'Ticket Category' },
  'tickets.maxTickets': { fr: 'Maximum de Tickets par Utilisateur', en: 'Max Tickets Per User' },
  'tickets.logChannel': { fr: 'Salon des Logs', en: 'Log Channel' },
  'tickets.supportRoles': { fr: 'Rôles Support', en: 'Support Roles' },
  'tickets.messages': { fr: 'Messages des Tickets', en: 'Ticket Messages' },
  'tickets.creationMessage': { fr: 'Message de Création', en: 'Creation Message' },
  'tickets.closeMessage': { fr: 'Message de Fermeture', en: 'Close Message' },

  // Logs Module
  'logs.title': { fr: 'Logs du Serveur', en: 'Server Logs' },
  'logs.subtitle': { fr: 'Suivez tous les événements du serveur dans un salon dédié.', en: 'Track all server events in a dedicated channel.' },
  'logs.enable': { fr: 'Activer les Logs', en: 'Enable Logging' },
  'logs.enableDesc': { fr: 'Enregistrer les événements du serveur dans un salon', en: 'Log server events to a channel' },
  'logs.logChannel': { fr: 'Salon des Logs', en: 'Log Channel' },
  'logs.messageEvents': { fr: 'Événements de Messages', en: 'Message Events' },
  'logs.messageDesc': { fr: 'Modifications, suppressions, épingles', en: 'Message edits, deletions, pins' },
  'logs.voiceEvents': { fr: 'Événements Vocaux', en: 'Voice Events' },
  'logs.voiceDesc': { fr: 'Rejoindre, partir, changer de salon', en: 'Join, leave, switch channels' },
  'logs.memberEvents': { fr: 'Événements des Membres', en: 'Member Events' },
  'logs.memberDesc': { fr: 'Arrivées, départs, bans, débans', en: 'Joins, leaves, bans, unbans' },
  'logs.modEvents': { fr: 'Événements de Modération', en: 'Moderation Events' },
  'logs.modDesc': { fr: 'Kicks, bans, mutes, avertissements', en: 'Kicks, bans, mutes, warns' },
  'logs.serverEvents': { fr: 'Événements du Serveur', en: 'Server Events' },
  'logs.serverDesc': { fr: 'Changements de rôles, salons, emojis', en: 'Role, channel, emoji changes' },

  // Auto Mod Module
  'autoMod.title': { fr: 'Auto Modération', en: 'Auto Moderation' },
  'autoMod.subtitle': { fr: 'Modérez automatiquement votre serveur.', en: 'Automatically moderate your server.' },
  'autoMod.enable': { fr: 'Activer l\'Auto Modération', en: 'Enable Auto Moderation' },
  'autoMod.enableDesc': { fr: 'Filtrer et modérer automatiquement les messages', en: 'Automatically filter and moderate messages' },
  'autoMod.filters': { fr: 'Filtres d\'Auto Modération', en: 'Auto Moderation Filters' },
  'autoMod.thresholds': { fr: 'Seuils', en: 'Thresholds' },
  'autoMod.spamThreshold': { fr: 'Seuil de Spam (messages)', en: 'Spam Threshold (messages)' },
  'autoMod.mentionThreshold': { fr: 'Seuil de Mentions', en: 'Mention Threshold' },
  'autoMod.capsThreshold': { fr: 'Seuil de Majuscules (%)', en: 'Caps Threshold (%)' },

  // Captcha Module
  'captcha.title': { fr: 'Vérification Captcha', en: 'Captcha Verification' },
  'captcha.subtitle': { fr: 'Protégez votre serveur des bots avec la vérification captcha.', en: 'Protect your server from bots with captcha verification.' },
  'captcha.enable': { fr: 'Activer le Captcha', en: 'Enable Captcha' },
  'captcha.enableDesc': { fr: 'Vérifier les nouveaux membres avec un captcha', en: 'Verify new members with captcha' },
  'captcha.type': { fr: 'Type de Captcha', en: 'Captcha Type' },
  'captcha.image': { fr: 'Captcha Image', en: 'Image Captcha' },
  'captcha.imageDesc': { fr: 'Captcha textuel basé sur image', en: 'Text-based image captcha' },
  'captcha.math': { fr: 'Captcha Mathématique', en: 'Math Captcha' },
  'captcha.mathDesc': { fr: 'Problèmes mathématiques simples', en: 'Simple math problems' },
  'captcha.button': { fr: 'Captcha Bouton', en: 'Button Captcha' },
  'captcha.buttonDesc': { fr: 'Simple clic sur bouton', en: 'Simple button click' },
  'captcha.verification': { fr: 'Paramètres de Vérification', en: 'Verification Settings' },
  'captcha.verifiedRole': { fr: 'Rôle Vérifié', en: 'Verified Role' },
  'captcha.verificationChannel': { fr: 'Salon de Vérification', en: 'Verification Channel' },
  'captcha.timeout': { fr: 'Délai de Vérification (secondes)', en: 'Verification Timeout (seconds)' },
  'captcha.maxAttempts': { fr: 'Tentatives Maximum', en: 'Maximum Attempts' },
  'captcha.kickOnFail': { fr: 'Expulser si Échec', en: 'Kick on Failed' },
  'captcha.kickOnFailDesc': { fr: 'Expulser les membres qui échouent au captcha', en: 'Kick members who fail captcha' },

  // XP Module
  'xp.title': { fr: 'XP & Niveaux', en: 'XP & Levels' },
  'xp.subtitle': { fr: 'Configurez le système d\'expérience et de niveaux.', en: 'Configure the experience and leveling system.' },
  'xp.enable': { fr: 'Activer le Système XP', en: 'Enable XP System' },
  'xp.enableDesc': { fr: 'Suivre l\'activité des membres avec XP et niveaux', en: 'Track member activity with XP and levels' },
  'xp.messageXp': { fr: 'XP par Message', en: 'Message XP' },
  'xp.messageXpDesc': { fr: 'XP gagnée par message', en: 'XP earned per message' },
  'xp.voiceXp': { fr: 'XP Vocal', en: 'Voice XP' },
  'xp.voiceXpDesc': { fr: 'XP gagnée par minute en vocal', en: 'XP earned per minute in voice' },
  'xp.cooldown': { fr: 'Cooldown', en: 'Cooldown' },
  'xp.cooldownDesc': { fr: 'Cooldown XP (secondes)', en: 'XP cooldown (seconds)' },
  'xp.levelUpSettings': { fr: 'Paramètres de Montée de Niveau', en: 'Level Up Settings' },
  'xp.levelUpMessage': { fr: 'Message de Montée de Niveau', en: 'Level Up Message' },
  'xp.levelUpChannel': { fr: 'Salon de Montée de Niveau', en: 'Level Up Channel' },
  'xp.announceCurrent': { fr: 'Annoncer dans le Salon Actuel', en: 'Announce in Current Channel' },
  'xp.announceCurrentDesc': { fr: 'Envoyer la montée de niveau dans le salon de l\'utilisateur', en: 'Send level up in the user\'s channel' },
  'xp.roleRewards': { fr: 'Récompenses de Rôle', en: 'Role Rewards' },
  'xp.addReward': { fr: 'Ajouter une Récompense', en: 'Add Reward' },
  'xp.level': { fr: 'Niveau', en: 'Level' },

  // Giveaways Module
  'giveaways.title': { fr: 'Concours', en: 'Giveaways' },
  'giveaways.subtitle': { fr: 'Créez et gérez les concours du serveur.', en: 'Create and manage server giveaways.' },
  'giveaways.create': { fr: 'Créer un Concours', en: 'Create Giveaway' },
  'giveaways.enable': { fr: 'Activer les Concours', en: 'Enable Giveaways' },
  'giveaways.enableDesc': { fr: 'Permettre la création de concours dans le serveur', en: 'Allow giveaway creation in the server' },
  'giveaways.defaultDuration': { fr: 'Durée par Défaut', en: 'Default Duration' },
  'giveaways.durationHours': { fr: 'Durée en heures', en: 'Duration in hours' },
  'giveaways.defaultWinners': { fr: 'Gagnants par Défaut', en: 'Default Winners' },
  'giveaways.winnersCount': { fr: 'Nombre de gagnants', en: 'Number of winners' },
  'giveaways.defaultRole': { fr: 'Rôle Requis par Défaut', en: 'Default Role Requirement' },
  'giveaways.roleToParticipate': { fr: 'Rôle requis pour participer', en: 'Required role to participate' },
  'giveaways.active': { fr: 'Concours Actifs', en: 'Active Giveaways' },
  'giveaways.winners': { fr: 'gagnant(s)', en: 'winner(s)' },
  'giveaways.remaining': { fr: 'restant', en: 'remaining' },
  'giveaways.enter': { fr: 'Participer au Concours', en: 'Enter Giveaway' },

  // Suggestions Module
  'suggestions.title': { fr: 'Suggestions', en: 'Suggestions' },
  'suggestions.subtitle': { fr: 'Permettez aux membres de soumettre et voter sur les suggestions.', en: 'Let members submit and vote on server suggestions.' },
  'suggestions.enable': { fr: 'Activer les Suggestions', en: 'Enable Suggestions' },
  'suggestions.enableDesc': { fr: 'Permettre aux membres de soumettre des suggestions', en: 'Allow members to submit suggestions' },
  'suggestions.channel': { fr: 'Salon des Suggestions', en: 'Suggestion Channel' },
  'suggestions.approvedChannel': { fr: 'Salon Approuvées', en: 'Approved Channel' },
  'suggestions.deniedChannel': { fr: 'Salon Refusées', en: 'Denied Channel' },
  'suggestions.emojis': { fr: 'Emojis de Vote', en: 'Vote Emojis' },
  'suggestions.upvote': { fr: 'Emoji Contre', en: 'Upvote Emoji' },
  'suggestions.downvote': { fr: 'Emoji Contre', en: 'Downvote Emoji' },
  'suggestions.autoApprove': { fr: 'Approbation Auto', en: 'Auto Approve' },
  'suggestions.autoApproveDesc': { fr: 'Approuver automatiquement les suggestions atteignant le seuil de votes', en: 'Automatically approve suggestions that reach the vote threshold' },
  'suggestions.voteThreshold': { fr: 'Seuil de Votes', en: 'Vote Threshold' },
  'suggestions.recent': { fr: 'Suggestions Récentes', en: 'Recent Suggestions' },
  'suggestions.pending': { fr: 'en attente', en: 'pending' },
  'suggestions.approved': { fr: 'approuvée', en: 'approved' },

  // Languages Module
  'languages.title': { fr: 'Langues', en: 'Languages' },
  'languages.subtitle': { fr: 'Configurez les paramètres de langue et les traductions.', en: 'Configure language settings and translations.' },
  'languages.default': { fr: 'Langue par Défaut', en: 'Default Language' },
  'languages.autoTranslate': { fr: 'Traduction Auto', en: 'Auto Translation' },
  'languages.autoTranslateDesc': { fr: 'Traduire automatiquement les messages du bot', en: 'Automatically translate bot messages' },
  'languages.available': { fr: 'Langues Disponibles', en: 'Available Languages' },
  'languages.availableDesc': { fr: 'Sélectionnez les langues disponibles pour les utilisateurs.', en: 'Select which languages are available for users to choose from.' },
  'languages.translated': { fr: 'traduit', en: 'translated' },

  // Invite Tracking Module
  'invites.title': { fr: 'Suivi des Invitations', en: 'Invite Tracking' },
  'invites.subtitle': { fr: 'Suivez qui a invité chaque membre sur votre serveur.', en: 'Track who invited each member to your server.' },
  'invites.enable': { fr: 'Activer le Suivi des Invitations', en: 'Enable Invite Tracking' },
  'invites.enableDesc': { fr: 'Suivre les invitations des membres', en: 'Track member invitations' },
  'invites.leaderboard': { fr: 'Classement des Invitations', en: 'Invite Leaderboard' },
  'invites.totalInvites': { fr: 'Invitations Totales', en: 'Total Invites' },
  'invites.validInvites': { fr: 'Invitations Valides', en: 'Valid Invites' },
  'invites.fakeInvites': { fr: 'Fausses Invitations', en: 'Fake Invites' },
  'invites.joinMessage': { fr: 'Message d\'Arrivée', en: 'Join Message' },

  // Security Module
  'security.title': { fr: 'Sécurité', en: 'Security' },
  'security.subtitle': { fr: 'Protégez votre serveur avec des fonctionnalités de sécurité avancées.', en: 'Protect your server with advanced security features.' },
  'security.enable': { fr: 'Activer la Sécurité Avancée', en: 'Enable Advanced Security' },
  'security.enableDesc': { fr: 'Activer les protections de sécurité avancées', en: 'Enable advanced security protections' },
  'security.logChannel': { fr: 'Salon des Alertes', en: 'Alert Channel' },
  'security.raidProtection': { fr: 'Protection Anti-Raid', en: 'Raid Protection' },
  'security.raidDesc': { fr: 'Bloquer les raids automatiquement', en: 'Automatically block raids' },
  'security.newAccountProtection': { fr: 'Protection Nouveaux Comptes', en: 'New Account Protection' },
  'security.newAccountDesc': { fr: 'Restreindre les nouveaux comptes Discord', en: 'Restrict new Discord accounts' },
  'security.joinRate': { fr: 'Seuil d\'Entrées (par minute)', en: 'Join Rate Threshold (per minute)' },
  'security.accountAge': { fr: 'Âge Minimum du Compte (jours)', en: 'Minimum Account Age (days)' },

  // Anti Nuke Module
  'antiNuke.title': { fr: 'Anti Nuke Avancé', en: 'Advanced Anti Nuke' },
  'antiNuke.subtitle': { fr: 'Protégez votre serveur contre les attaques de destruction massive.', en: 'Protect your server from nuke attacks.' },
  'antiNuke.enable': { fr: 'Activer l\'Anti Nuke', en: 'Enable Anti Nuke' },
  'antiNuke.enableDesc': { fr: 'Activer la protection contre les attaques', en: 'Enable nuke protection' },
  'antiNuke.trustedAdmins': { fr: 'Admins de Confiance', en: 'Trusted Admins' },
  'antiNuke.trustedDesc': { fr: 'Ces utilisateurs peuvent contourner Anti Nuke', en: 'These users can bypass Anti Nuke' },
  'antiNuke.actions': { fr: 'Actions Surveillées', en: 'Monitored Actions' },
  'antiNuke.threshold': { fr: 'Seuil par Action', en: 'Threshold per Action' },
  'antiNuke.punishment': { fr: 'Sanction', en: 'Punishment' },
  'antiNuke.kick': { fr: 'Expulser', en: 'Kick' },
  'antiNuke.ban': { fr: 'Bannir', en: 'Ban' },
  'antiNuke.removeRoles': { fr: 'Retirer les Rôles', en: 'Remove Roles' },
  'antiNuke.channelDelete': { fr: 'Suppression de Salon', en: 'Channel Delete' },
  'antiNuke.roleDelete': { fr: 'Suppression de Rôle', en: 'Role Delete' },
  'antiNuke.emojiDelete': { fr: 'Suppression d\'Emoji', en: 'Emoji Delete' },
  'antiNuke.webhookDelete': { fr: 'Suppression de Webhook', en: 'Webhook Delete' },
  'antiNuke.banCreate': { fr: 'Création de Ban', en: 'Ban Create' },
  'antiNuke.kickCreate': { fr: 'Création de Kick', en: 'Kick Create' },

  // Temp Voice Module
  'tempVoice.title': { fr: 'Salons Vocaux Temporaires', en: 'Temporary Voice Channels' },
  'tempVoice.subtitle': { fr: 'Créez des salons vocaux temporaires automatiquement.', en: 'Create temporary voice channels automatically.' },
  'tempVoice.enable': { fr: 'Activer les Salons Vocaux Temp.', en: 'Enable Temp Voice' },
  'tempVoice.enableDesc': { fr: 'Permettre la création de salons vocaux temporaires', en: 'Allow temporary voice channel creation' },
  'tempVoice.category': { fr: 'Catégorie Parent', en: 'Parent Category' },
  'tempVoice.joinChannel': { fr: 'Salon de Création', en: 'Creation Channel' },
  'tempVoice.joinDesc': { fr: 'Rejoignez ce salon pour créer un salon temporaire', en: 'Join this channel to create a temporary channel' },
  'tempVoice.defaultName': { fr: 'Nom par Défaut', en: 'Default Name' },
  'tempVoice.maxChannels': { fr: 'Maximum par Utilisateur', en: 'Max Per User' },

  // Analytics Module
  'analytics.title': { fr: 'Analytiques', en: 'Analytics' },
  'analytics.subtitle': { fr: 'Visualisez les statistiques et tendances de votre serveur.', en: 'View your server statistics and trends.' },
  'analytics.overview': { fr: 'Vue d\'Ensemble', en: 'Overview' },
  'analytics.members': { fr: 'Membres', en: 'Members' },
  'analytics.messages': { fr: 'Messages', en: 'Messages' },
  'analytics.activity': { fr: 'Activité', en: 'Activity' },
  'analytics.growth': { fr: 'Croissance', en: 'Growth' },
  'analytics.today': { fr: 'Aujourd\'hui', en: 'Today' },
  'analytics.week': { fr: 'Cette Semaine', en: 'This Week' },
  'analytics.month': { fr: 'Ce Mois', en: 'This Month' },
  'analytics.joins': { fr: 'Nouvelles Arrivées', en: 'New Joins' },
  'analytics.leaves': { fr: 'Départs', en: 'Leaves' },
  'analytics.peakOnline': { fr: 'Pic en Ligne', en: 'Peak Online' },
  'analytics.avgOnline': { fr: 'Moyenne en Ligne', en: 'Average Online' },

  // Embed Builder Module
  'embed.title': { fr: 'Créateur d\'Embed', en: 'Embed Builder' },
  'embed.subtitle': { fr: 'Créez des embeds personnalisés pour vos messages.', en: 'Create custom embeds for your messages.' },
  'embed.create': { fr: 'Créer un Embed', en: 'Create Embed' },
  'embed.titleField': { fr: 'Titre', en: 'Title' },
  'embed.description': { fr: 'Description', en: 'Description' },
  'embed.color': { fr: 'Couleur', en: 'Color' },
  'embed.footer': { fr: 'Pied de Page', en: 'Footer' },
  'embed.image': { fr: 'Image', en: 'Image' },
  'embed.thumbnail': { fr: 'Miniature', en: 'Thumbnail' },
  'embed.timestamp': { fr: 'Horodatage', en: 'Timestamp' },
  'embed.sendTo': { fr: 'Envoyer à', en: 'Send To' },
  'embed.send': { fr: 'Envoyer', en: 'Send' },
  'embed.saved': { fr: 'Embeds Sauvegardés', en: 'Saved Embeds' },

  // Backups Module
  'backups.title': { fr: 'Sauvegardes', en: 'Backups' },
  'backups.subtitle': { fr: 'Sauvegardez et restaurez les paramètres de votre serveur.', en: 'Backup and restore your server settings.' },
  'backups.enable': { fr: 'Activer les Sauvegardes Auto', en: 'Enable Auto Backups' },
  'backups.enableDesc': { fr: 'Sauvegarder automatiquement les paramètres', en: 'Automatically backup settings' },
  'backups.frequency': { fr: 'Fréquence', en: 'Frequency' },
  'backups.daily': { fr: 'Quotidien', en: 'Daily' },
  'backups.weekly': { fr: 'Hebdomadaire', en: 'Weekly' },
  'backups.monthly': { fr: 'Mensuel', en: 'Monthly' },
  'backups.create': { fr: 'Créer une Sauvegarde', en: 'Create Backup' },
  'backups.restore': { fr: 'Restaurer', en: 'Restore' },
  'backups.delete': { fr: 'Supprimer', en: 'Delete' },
  'backups.history': { fr: 'Historique des Sauvegardes', en: 'Backup History' },
  'backups.size': { fr: 'Taille', en: 'Size' },

  // Settings Module
  'settings.title': { fr: 'Paramètres', en: 'Settings' },
  'settings.subtitle': { fr: 'Configurez les paramètres généraux du tableau de bord.', en: 'Configure general dashboard settings.' },
  'settings.general': { fr: 'Général', en: 'General' },
  'settings.language': { fr: 'Langue', en: 'Language' },
  'settings.languageDesc': { fr: 'Choisissez la langue du tableau de bord', en: 'Choose dashboard language' },
  'settings.timezone': { fr: 'Fuseau Horaire', en: 'Timezone' },
  'settings.notifications': { fr: 'Notifications', en: 'Notifications' },
  'settings.notifyDesc': { fr: 'Recevoir des notifications pour les événements importants', en: 'Receive notifications for important events' },
  'settings.prefix': { fr: 'Préfixe du Bot', en: 'Bot Prefix' },
  'settings.prefixDesc': { fr: 'Préfixe des commandes du bot', en: 'Bot command prefix' },
  'settings.dangerZone': { fr: 'Zone de Danger', en: 'Danger Zone' },
  'settings.resetConfig': { fr: 'Réinitialiser la Configuration', en: 'Reset Configuration' },
  'settings.resetDesc': { fr: 'Réinitialiser tous les paramètres du serveur', en: 'Reset all server settings' },
  'settings.removeBot': { fr: 'Retirer le Bot', en: 'Remove Bot' },
  'settings.removeDesc': { fr: 'Supprimer CIVRAT de ce serveur', en: 'Remove CIVRAT from this server' },

  // Premium Module
  'premium.title': { fr: 'Premium', en: 'Premium' },
  'premium.subtitle': { fr: 'Débloquez toutes les fonctionnalités avec CIVRAT Premium.', en: 'Unlock all features with CIVRAT Premium.' },
  'premium.currentPlan': { fr: 'Plan Actuel', en: 'Current Plan' },
  'premium.free': { fr: 'Gratuit', en: 'Free' },
  'premium.pro': { fr: 'Pro', en: 'Pro' },
  'premium.enterprise': { fr: 'Entreprise', en: 'Enterprise' },
  'premium.upgrade': { fr: 'Passer à Premium', en: 'Upgrade to Premium' },
  'premium.features': { fr: 'Fonctionnalités Premium', en: 'Premium Features' },
  'premium.unlimitedServers': { fr: 'Serveurs illimités', en: 'Unlimited Servers' },
  'premium.prioritySupport': { fr: 'Support Prioritaire', en: 'Priority Support' },
  'premium.advancedStats': { fr: 'Statistiques Avancées', en: 'Advanced Stats' },
  'premium.customBranding': { fr: 'Marque Personnalisée', en: 'Custom Branding' },
  'premium.api': { fr: 'Accès API', en: 'API Access' },
  'premium.price': { fr: '/mois', en: '/month' },

  // Auth
  'auth.completing': { fr: 'Connexion en cours', en: 'Completing Sign In' },
  'auth.wait': { fr: 'Veuillez patienter pendant la configuration de votre compte...', en: 'Please wait while we set up your account...' },
  'auth.error': { fr: 'Erreur d\'authentification', en: 'Authentication Error' },
  'auth.failed': { fr: 'Connexion échouée', en: 'Sign In Failed' },
  'auth.noSession': { fr: 'Aucune session trouvée', en: 'No session found' },

  // Additional keys for hardcoded text
  'common.popular': { fr: 'Populaire', en: 'Popular' },
  'common.contact': { fr: 'Nous contacter', en: 'Contact Us' },
  'common.currentPlan': { fr: 'Plan actuel', en: 'Current plan' },
  'common.addBot': { fr: 'Ajouter le Bot', en: 'Add Bot' },
  'common.supportServer': { fr: 'Serveur Support', en: 'Support Server' },
  'common.english': { fr: 'English', en: 'English' },
  'common.french': { fr: 'Français', en: 'French' },
  'common.selected': { fr: 'Sélectionné', en: 'Selected' },
  'common.content': { fr: 'Contenu', en: 'Content' },
  'common.media': { fr: 'Média', en: 'Media' },
  'common.discordPreview': { fr: 'Aperçu Discord', en: 'Discord Preview' },
  'common.serverInfo': { fr: 'Informations du Serveur', en: 'Server Information' },
  'common.serverId': { fr: 'ID du Serveur', en: 'Server ID' },
  'common.botJoined': { fr: 'Bot rejoint', en: 'Bot Joined' },
  'common.features': { fr: 'Fonctionnalités', en: 'Features' },
  'common.lastBackup': { fr: 'Dernière sauvegarde', en: 'Last Backup' },
  'common.needHelp': { fr: 'Besoin d\'aide ?', en: 'Need Help?' },
  'common.addTrustedAdmin': { fr: '+ Ajouter un Admin de Confiance', en: '+ Add Trusted Admin' },
  'common.quarantineSettings': { fr: 'Paramètres de Quarantaine', en: 'Quarantine Settings' },
  'common.muteRole': { fr: 'Rôle Muet', en: 'Mute Role' },
  'common.delayActions': { fr: 'Délai & Actions', en: 'Delay & Actions' },
  'common.verified': { fr: 'Vérifié', en: 'Verified' },
  'common.member': { fr: 'Membre', en: 'Member' },
  'common.backupContent': { fr: 'Contenu de la sauvegarde', en: 'Backup Content' },
  'common.roles': { fr: 'Rôles', en: 'Roles' },
  'common.channels': { fr: 'Salons', en: 'Channels' },
  'common.messages': { fr: 'Messages', en: 'Messages' },
  'common.topChannels': { fr: 'Top Salons', en: 'Top Channels' },
  'common.messagesPerDay': { fr: 'Messages par jour', en: 'Messages per day' },
  'common.voiceOptions': { fr: 'Options du Salon', en: 'Voice Channel Options' },
  'common.autoLock': { fr: 'Auto-verrouillage', en: 'Auto-Lock' },
  'common.autoBitrate': { fr: 'Auto-bitrate', en: 'Auto-Bitrate' },
  'common.createManualBackup': { fr: 'Créer une sauvegarde manuelle maintenant', en: 'Create a manual backup now' },
  'common.retention': { fr: 'Rétention', en: 'Retention' },
  'common.keepBackupsFor': { fr: 'Garder les sauvegardes pendant (jours)', en: 'Keep backups for (days)' },
  'common.timezones.forLogsAndStats': { fr: 'Fuseau horaire pour les logs et statistiques', en: 'Timezone for logs and statistics' },
  'common.supportServerDesc': { fr: 'Rejoignez notre serveur Discord pour obtenir de l\'aide, signaler des bugs ou suggérer des améliorations.', en: 'Join our Discord server for help, bug reports, or suggestions.' },
  'languages.enabled': { fr: 'activées', en: 'enabled' },
  'welcome.rolesDesc': { fr: 'Rôles et permissions', en: 'Roles and permissions' },
  'tempVoice.channelDesc': { fr: 'Structure des salons', en: 'Channel structure' },
  'common.backupNow': { fr: 'Sauvegarder', en: 'Backup Now' },
  'common.manual': { fr: 'Manuel', en: 'Manual' },
  'common.auto': { fr: 'Auto', en: 'Auto' },
  'common.refresh': { fr: 'Actualiser', en: 'Refresh' },
  'invites.joinMessageDesc': { fr: 'Message d\'arrivée avec invitation', en: 'Join message with invitation' },
  'invites.trackFakeDesc': { fr: 'Détecter les fausses invitations', en: 'Detect fake invites' },
  'invites.trackLeavesDesc': { fr: 'Suivre les départs', en: 'Track leaves' },
  'security.quarantineRole': { fr: 'Rôle Quarantaine', en: 'Quarantine Role' },
  'security.alertRole': { fr: 'Rôle Alerte', en: 'Alert Role' },
  'tempVoice.autoLockDesc': { fr: 'Verrouiller automatiquement le salon', en: 'Automatically lock the channel' },
  'tempVoice.autoBitrateDesc': { fr: 'Ajuster le bitrate selon le jeu', en: 'Adjust bitrate based on game' },
  'analytics.avgVoiceTime': { fr: 'Temps vocal moyen', en: 'Average voice time' },
  'premium.unlimitedServersDesc': { fr: 'Gérez autant de serveurs que vous voulez', en: 'Manage as many servers as you want' },
  'premium.advancedStatsDesc': { fr: 'Analytiques détaillés de votre serveur', en: 'Detailed analytics for your server' },
  'premium.customBrandingDesc': { fr: 'Personnalisez les messages du bot', en: 'Customize bot messages' },
  'premium.apiDesc': { fr: 'Intégrez CIVRAT à vos systèmes', en: 'Integrate CIVRAT with your systems' },
  'premium.exclusiveFeatures': { fr: 'Fonctionnalités exclusives', en: 'Exclusive Features' },
  'premium.exclusiveFeaturesDesc': { fr: 'Accès anticipé aux nouvelles fonctionnalités', en: 'Early access to new features' },
  'premium.prioritySupportDesc': { fr: 'Réponse garantie sous 24h', en: 'Guaranteed response within 24h' },
  'premium.testimonials': { fr: 'Ce que disent nos utilisateurs Premium', en: 'What our Premium users say' },
  'premium.faq': { fr: 'Questions Fréquentes', en: 'Frequently Asked Questions' },
  'premium.monthly': { fr: 'Mensuel', en: 'Monthly' },
  'premium.yearly': { fr: 'Annuel', en: 'Yearly' },
  'embed.content': { fr: 'Contenu', en: 'Content' },
  'embed.media': { fr: 'Média', en: 'Media' },
  'embed.preview': { fr: 'Aperçu Discord', en: 'Discord Preview' },
  'embed.new': { fr: 'Nouveau', en: 'New' },
  'premium.custom': { fr: 'Sur mesure', en: 'Custom' },
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('civrat-language')
    return (saved === 'en' || saved === 'fr') ? saved : 'fr'
  })

  useEffect(() => {
    localStorage.setItem('civrat-language', language)
  }, [language])

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`)
      return key
    }
    return translation[language]
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export { translations }
