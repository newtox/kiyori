import { Client, Events, GatewayIntentBits } from "discord.js";

const token = process.env.TOKEN;

if (!token) {
  console.error("TOKEN is missing");
  process.exit(1);
}

function csv(value: string | number): string {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async readyClient => {
  const guilds = [...readyClient.guilds.cache.values()].sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);

  console.log("joined_at,member_count,guild_id,name");
  for (const guild of guilds) {
    console.log([new Date(guild.joinedTimestamp).toISOString(), guild.memberCount, guild.id, guild.name].map(csv).join(","));
  }

  const perMonth = new Map<string, number>();
  for (const guild of guilds) {
    const month = new Date(guild.joinedTimestamp).toISOString().slice(0, 7);
    perMonth.set(month, (perMonth.get(month) ?? 0) + 1);
  }

  const max = Math.max(...perMonth.values());
  console.error(`\n${guilds.length} servers, joins per month (servers that left are not included):`);
  for (const [month, count] of perMonth) {
    console.error(`${month}  ${String(count).padStart(4)}  ${"#".repeat(Math.ceil((count / max) * 40))}`);
  }

  const sizes = guilds.map(g => g.memberCount).sort((a, b) => a - b);
  const small = sizes.filter(n => n < 10).length;
  console.error(`\nmedian members: ${sizes[Math.floor(sizes.length / 2)] ?? 0}, servers with fewer than 10 members: ${small}`);

  await client.destroy();
  process.exit(0);
});

client.login(token);
