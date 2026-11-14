export const actions = ["hug", "pat", "cuddle", "kiss", "slap"] as const;
export type Action = (typeof actions)[number];

type Lang = "en" | "de" | "fr" | "es" | "ru" | "ja";

interface Strings {
  roleplay: Record<Action, string>;
  about: string;
  invite: string;
  error: string;
}

const strings: Record<Lang, Strings> = {
  en: {
    roleplay: {
      hug: "$target, you've been hugged by $author!",
      pat: "$target, you've been patted by $author!",
      cuddle: "$target, you've been cuddled by $author!",
      kiss: "$target, you've been kissed by $author!",
      slap: "$target, you've been slapped by $author!"
    },
    about: "Hi, I'm Kiyori! Most of my features now live in **Toxbot**, together with a lot of new ones.\nI'm still around for hugs and pats with `/roleplay`.",
    invite: "Invite Toxbot",
    error: "I couldn't load an image right now. Please try again in a moment."
  },
  de: {
    roleplay: {
      hug: "$target, du wurdest von $author umarmt!",
      pat: "$target, du wurdest von $author gestreichelt!",
      cuddle: "$target, du wurdest von $author geknuddelt!",
      kiss: "$target, du wurdest von $author geküsst!",
      slap: "$target, du wurdest von $author geohrfeigt!"
    },
    about: "Hi, ich bin Kiyori! Die meisten meiner Funktionen stecken jetzt in **Toxbot**, zusammen mit vielen neuen.\nFür Umarmungen und Streicheleinheiten mit `/roleplay` bin ich aber weiterhin da.",
    invite: "Toxbot einladen",
    error: "Ich konnte gerade kein Bild laden. Versuch es gleich noch einmal."
  },
  fr: {
    roleplay: {
      hug: "$target, $author te fait un câlin !",
      pat: "$target, $author te caresse la tête !",
      cuddle: "$target, $author se blottit contre toi !",
      kiss: "$target, $author t'embrasse !",
      slap: "$target, $author te gifle !"
    },
    about: "Salut, je suis Kiyori ! La plupart de mes fonctionnalités se trouvent désormais dans **Toxbot**, avec plein de nouveautés.\nJe reste là pour les câlins et les caresses avec `/roleplay`.",
    invite: "Inviter Toxbot",
    error: "Je n'ai pas pu charger d'image. Réessaie dans un instant."
  },
  es: {
    roleplay: {
      hug: "¡$target, $author te ha abrazado!",
      pat: "¡$target, $author te ha acariciado la cabeza!",
      cuddle: "¡$target, $author se ha acurrucado contigo!",
      kiss: "¡$target, $author te ha besado!",
      slap: "¡$target, $author te ha dado una bofetada!"
    },
    about: "¡Hola, soy Kiyori! La mayoría de mis funciones ahora están en **Toxbot**, junto con muchas novedades.\nSigo aquí para abrazos y caricias con `/roleplay`.",
    invite: "Invitar a Toxbot",
    error: "No he podido cargar una imagen. Inténtalo de nuevo en un momento."
  },
  ru: {
    roleplay: {
      hug: "$target, вас обнял(а) $author!",
      pat: "$target, вас погладил(а) $author!",
      cuddle: "$target, к вам прижался(-ась) $author!",
      kiss: "$target, вас поцеловал(а) $author!",
      slap: "$target, вы получили пощёчину от $author!"
    },
    about: "Привет, я Kiyori! Большинство моих функций теперь в **Toxbot**, вместе с множеством новых.\nДля объятий и поглаживаний с `/roleplay` я по-прежнему здесь.",
    invite: "Пригласить Toxbot",
    error: "Не удалось загрузить картинку. Попробуйте ещё раз чуть позже."
  },
  ja: {
    roleplay: {
      hug: "$authorさんが$targetさんをハグしました！",
      pat: "$authorさんが$targetさんをなでなでしました！",
      cuddle: "$authorさんが$targetさんをぎゅっと抱きしめました！",
      kiss: "$authorさんが$targetさんにキスしました！",
      slap: "$authorさんが$targetさんにビンタしました！"
    },
    about: "こんにちは、キヨリです！私の機能のほとんどは、たくさんの新機能と一緒に **Toxbot** に引っ越しました。\n`/roleplay` でのハグやなでなでは、これからも私にお任せください。",
    invite: "Toxbotを招待",
    error: "画像を読み込めませんでした。少し待ってからもう一度お試しください。"
  }
};

export function t(locale: string): Strings {
  const lang = locale.split("-")[0] as Lang;
  return strings[lang] ?? strings.en;
}

export const commandText = {
  roleplay: {
    description: "Hug, pat, cuddle, kiss or slap someone.",
    descriptionLocalizations: {
      de: "Umarme, streichle, knuddle, küsse oder ohrfeige jemanden.",
      fr: "Fais un câlin, une caresse, un bisou ou une gifle à quelqu'un.",
      "es-ES": "Abraza, acaricia, acurrúcate, besa o abofetea a alguien.",
      "es-419": "Abraza, acaricia, acurrúcate, besa o abofetea a alguien.",
      ru: "Обнять, погладить, прижаться, поцеловать или дать пощёчину.",
      ja: "誰かをハグ、なでなで、ぎゅっ、キス、ビンタします。"
    },
    action: {
      description: "What you want to do.",
      descriptionLocalizations: {
        de: "Was du tun möchtest.",
        fr: "Ce que tu veux faire.",
        "es-ES": "Lo que quieres hacer.",
        "es-419": "Lo que quieres hacer.",
        ru: "Что вы хотите сделать.",
        ja: "やりたいこと。"
      },
      choices: {
        hug: { name: "Hug", localizations: { de: "Umarmen", fr: "Câlin", "es-ES": "Abrazar", "es-419": "Abrazar", ru: "Обнять", ja: "ハグ" } },
        pat: { name: "Pat", localizations: { de: "Streicheln", fr: "Caresse", "es-ES": "Acariciar", "es-419": "Acariciar", ru: "Погладить", ja: "なでなで" } },
        cuddle: { name: "Cuddle", localizations: { de: "Knuddeln", fr: "Blottir", "es-ES": "Acurrucar", "es-419": "Acurrucar", ru: "Прижаться", ja: "ぎゅっ" } },
        kiss: { name: "Kiss", localizations: { de: "Küssen", fr: "Bisou", "es-ES": "Besar", "es-419": "Besar", ru: "Поцеловать", ja: "キス" } },
        slap: { name: "Slap", localizations: { de: "Ohrfeigen", fr: "Gifle", "es-ES": "Abofetear", "es-419": "Abofetear", ru: "Пощёчина", ja: "ビンタ" } }
      } satisfies Record<Action, { name: string; localizations: Record<string, string> }>
    },
    user: {
      description: "The user.",
      descriptionLocalizations: {
        de: "Der Benutzer.",
        fr: "L'utilisateur.",
        "es-ES": "El usuario.",
        "es-419": "El usuario.",
        ru: "Пользователь.",
        ja: "ユーザー。"
      }
    }
  },
  about: {
    description: "What happened to Kiyori, and where to find Toxbot.",
    descriptionLocalizations: {
      de: "Was aus Kiyori geworden ist und wo du Toxbot findest.",
      fr: "Ce qu'est devenue Kiyori et où trouver Toxbot.",
      "es-ES": "Qué pasó con Kiyori y dónde encontrar a Toxbot.",
      "es-419": "Qué pasó con Kiyori y dónde encontrar a Toxbot.",
      ru: "Что случилось с Kiyori и где найти Toxbot.",
      ja: "キヨリのこれからと、Toxbotの紹介。"
    }
  }
};
