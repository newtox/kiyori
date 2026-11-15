# Kiyori

Kiyori is a small Discord bot for anime roleplay GIFs. Most of her old features now live in [Shiori](https://github.com/newtox/shiori), and `/about` points servers there.

## Commands

- `/roleplay action user`: hug, pat, cuddle, kiss or slap someone with an anime GIF from [nekos.best](https://nekos.best). The footer shows which anime the GIF is from.
- `/about`: what happened to Kiyori, with a button to invite Shiori.

Both commands follow the user's Discord language: English, German, French, Spanish, Russian and Japanese.

## Running it

Kiyori runs as a Docker image that GitHub Actions builds on every push to `main`: `ghcr.io/newtox/kiyori:latest`.

```
cp .env.example .env
docker compose up -d
```

`.env`:

| Variable | Description |
| --- | --- |
| `TOKEN` | Bot token from the Discord Developer Portal |
| `SHIORI_URL` | Link behind the invite button, defaults to Shiori's Top.gg page |

The commands are registered globally whenever the bot starts.

## Development

Needs Node.js 22 or newer.

```
npm install
npm run build
TOKEN=... npm start
```

`npm run export-guilds` logs in once and prints every server as CSV (join date, member count, ID, name) plus the joins per month, then exits.

## Contact

justin.lys26@gmail.com
