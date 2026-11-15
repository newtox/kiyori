import {
  ActionRowBuilder,
  ActivityType,
  ApplicationIntegrationType,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  Client,
  Colors,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
  InteractionContextType,
  SlashCommandBuilder
} from "discord.js";
import { Action, actions, commandText, t } from "./i18n";

const token = process.env.TOKEN;
const shioriUrl = process.env.SHIORI_URL || "https://top.gg/bot/561253410591211520";

if (!token) {
  console.error("TOKEN is missing");
  process.exit(1);
}

const rp = commandText.roleplay;

const commands = [
  new SlashCommandBuilder()
    .setName("roleplay")
    .setDescription(rp.description)
    .setDescriptionLocalizations(rp.descriptionLocalizations)
    .setContexts(InteractionContextType.Guild)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .addStringOption(option =>
      option
        .setName("action")
        .setDescription(rp.action.description)
        .setDescriptionLocalizations(rp.action.descriptionLocalizations)
        .setRequired(true)
        .addChoices(
          ...actions.map(action => ({
            name: rp.action.choices[action].name,
            name_localizations: rp.action.choices[action].localizations,
            value: action
          }))
        )
    )
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription(rp.user.description)
        .setDescriptionLocalizations(rp.user.descriptionLocalizations)
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("about")
    .setDescription(commandText.about.description)
    .setDescriptionLocalizations(commandText.about.descriptionLocalizations)
    .setContexts(InteractionContextType.Guild, InteractionContextType.BotDM)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
];

function shioriButton(locale: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(t(locale).invite).setURL(shioriUrl)
  );
}

interface Gif {
  url: string;
  anime?: string;
}

async function fetchImage(action: Action): Promise<Gif> {
  const res = await fetch(`https://nekos.best/api/v2/${action}`, {
    headers: { "User-Agent": "Kiyori (https://newtox.de)" },
    signal: AbortSignal.timeout(5000)
  });
  if (!res.ok) throw new Error(`nekos.best responded with ${res.status}`);
  const data = (await res.json()) as { results?: { url?: unknown; anime_name?: unknown }[] };
  const result = data.results?.[0];
  if (typeof result?.url !== "string") throw new Error("nekos.best returned no url");
  return { url: result.url, anime: typeof result.anime_name === "string" ? result.anime_name : undefined };
}

async function handleRoleplay(interaction: ChatInputCommandInteraction) {
  const action = interaction.options.getString("action", true) as Action;
  const target = interaction.options.getUser("user", true);
  const text = t(interaction.locale);

  await interaction.deferReply();

  let gif: Gif;
  try {
    gif = await fetchImage(action);
  } catch (error) {
    console.error(error);
    await interaction.editReply({ content: text.error });
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setDescription(text.roleplay[action].replace("$target", target.toString()).replace("$author", interaction.user.toString()))
    .setImage(gif.url);

  if (gif.anime) embed.setFooter({ text: gif.anime });

  await interaction.editReply({
    content: target.bot ? "" : target.toString(),
    embeds: [embed],
    components: [shioriButton(interaction.locale)],
    allowedMentions: { users: target.bot ? [] : [target.id] }
  });
}

async function handleAbout(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setThumbnail(interaction.client.user.displayAvatarURL({ size: 256 }))
    .setDescription(t(interaction.locale).about);

  await interaction.reply({ embeds: [embed], components: [shioriButton(interaction.locale)] });
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async readyClient => {
  console.log(`Logged in as ${readyClient.user.tag} on ${readyClient.guilds.cache.size} servers`);
  readyClient.user.setPresence({
    status: "online",
    activities: [{ name: "custom", type: ActivityType.Custom, state: "/roleplay · /about" }]
  });
  try {
    await readyClient.application.commands.set(commands.map(command => command.toJSON()));
    console.log("Registered /roleplay and /about");
  } catch (error) {
    console.error("Command registration failed", error);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  try {
    if (interaction.commandName === "roleplay") await handleRoleplay(interaction);
    else if (interaction.commandName === "about") await handleAbout(interaction);
  } catch (error) {
    console.error(error);
  }
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, async () => {
    await client.destroy();
    process.exit(0);
  });
}

client.login(token);
