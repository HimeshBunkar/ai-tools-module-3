import { PrismaClient, PricingModel, BillingFrequency } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Real logo, keyed off the company's real domain — no placeholder/broken assets. */
function logoFor(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

// ---------------------------------------------------------------------------
// Companies (real vendors, real domains)
// ---------------------------------------------------------------------------

const COMPANIES = [
  { slug: "openai", name: "OpenAI", domain: "openai.com" },
  { slug: "anthropic", name: "Anthropic", domain: "anthropic.com" },
  { slug: "midjourney-inc", name: "Midjourney, Inc.", domain: "midjourney.com" },
  { slug: "github", name: "GitHub (Microsoft)", domain: "github.com" },
  { slug: "google", name: "Google", domain: "google.com" },
  { slug: "perplexity-ai", name: "Perplexity AI", domain: "perplexity.ai" },
  { slug: "notion-labs", name: "Notion Labs", domain: "notion.so" },
  { slug: "jasper", name: "Jasper", domain: "jasper.ai" },
  { slug: "copy-ai", name: "Copy.ai", domain: "copy.ai" },
  { slug: "grammarly", name: "Grammarly", domain: "grammarly.com" },
  { slug: "stability-ai", name: "Stability AI", domain: "stability.ai" },
  { slug: "runway", name: "Runway", domain: "runwayml.com" },
  { slug: "synthesia", name: "Synthesia", domain: "synthesia.io" },
  { slug: "elevenlabs", name: "ElevenLabs", domain: "elevenlabs.io" },
  { slug: "descript", name: "Descript", domain: "descript.com" },
  { slug: "murf", name: "Murf AI", domain: "murf.ai" },
  { slug: "anysphere", name: "Anysphere (Cursor)", domain: "cursor.com" },
  { slug: "replit", name: "Replit", domain: "replit.com" },
  { slug: "tabnine", name: "Tabnine", domain: "tabnine.com" },
  { slug: "otter-ai", name: "Otter.ai", domain: "otter.ai" },
  { slug: "zapier", name: "Zapier", domain: "zapier.com" },
  { slug: "canva", name: "Canva", domain: "canva.com" },
  { slug: "adobe", name: "Adobe", domain: "adobe.com" },
  { slug: "framer", name: "Framer", domain: "framer.com" },
  { slug: "surfer", name: "Surfer", domain: "surferseo.com" },
  { slug: "writesonic", name: "Writesonic", domain: "writesonic.com" },
  { slug: "heygen", name: "HeyGen", domain: "heygen.com" },
  { slug: "character-ai", name: "Character.AI", domain: "character.ai" },
  { slug: "quora", name: "Quora (Poe)", domain: "poe.com" },
  { slug: "gamma", name: "Gamma", domain: "gamma.app" },
  { slug: "leonardo-ai", name: "Leonardo.Ai", domain: "leonardo.ai" },
  { slug: "suno", name: "Suno", domain: "suno.com" },
  { slug: "intercom", name: "Intercom", domain: "intercom.com" },
  { slug: "tidio", name: "Tidio", domain: "tidio.com" },
  { slug: "chatbase", name: "Chatbase", domain: "chatbase.co" },
] as const;

// ---------------------------------------------------------------------------
// Taxonomy
// ---------------------------------------------------------------------------

const CATEGORY_NAMES = [
  "Chatbots",
  "Writing",
  "Coding",
  "Image Generation",
  "Video",
  "Audio & Voice",
  "Productivity",
  "Marketing",
  "Design",
  "SEO",
  "Research",
  "Customer Support",
];

const TAG_NAMES = [
  "API",
  "Free Trial",
  "Open Source",
  "No Code",
  "Enterprise",
  "Browser Extension",
  "Chrome Extension",
  "Mobile App",
];

// ---------------------------------------------------------------------------
// Tools (real products, accurate positioning/pricing as of 2026)
// ---------------------------------------------------------------------------

type SeedTool = {
  slug: string;
  name: string;
  description: string;
  websiteUrl: string;
  companySlug: string | null;
  pricingModel: PricingModel;
  pricingAmount: number | null;
  billingFrequency: BillingFrequency;
  features: string[];
  categorySlugs: string[];
  tagSlugs: string[];
};

const TOOLS: SeedTool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    description:
      "A conversational AI assistant for writing, coding, research, and everyday tasks, with web browsing, voice, and custom GPTs.",
    websiteUrl: "https://chat.openai.com",
    companySlug: "openai",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 20,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Web browsing", "Code interpreter", "Custom GPTs", "Voice mode", "Image input"],
    categorySlugs: ["chatbots", "productivity", "coding"],
    tagSlugs: ["api", "free-trial", "mobile-app"],
  },
  {
    slug: "claude",
    name: "Claude",
    description:
      "An AI assistant built by Anthropic, focused on helpfulness, long context windows, and safety-conscious reasoning.",
    websiteUrl: "https://claude.ai",
    companySlug: "anthropic",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 20,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Long context window", "Artifacts", "Projects", "Code execution", "MCP connectors"],
    categorySlugs: ["chatbots", "coding", "writing"],
    tagSlugs: ["api", "enterprise", "mobile-app"],
  },
  {
    slug: "gemini",
    name: "Gemini",
    description:
      "Google's multimodal AI assistant, integrated with Search, Workspace, and Android for text, image, and code tasks.",
    websiteUrl: "https://gemini.google.com",
    companySlug: "google",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 19.99,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Workspace integration", "Multimodal input", "Deep Research", "2M token context"],
    categorySlugs: ["chatbots", "writing", "productivity"],
    tagSlugs: ["api", "mobile-app"],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    description:
      "An AI answer engine that pairs conversational search with cited sources for research and fact-finding.",
    websiteUrl: "https://www.perplexity.ai",
    companySlug: "perplexity-ai",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 20,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Cited answers", "Focus modes", "File upload", "Pro Search"],
    categorySlugs: ["research", "chatbots"],
    tagSlugs: ["api", "browser-extension", "mobile-app"],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    description:
      "An AI image generation tool known for painterly, high-fidelity visual output, accessed via Discord or its web app.",
    websiteUrl: "https://www.midjourney.com",
    companySlug: "midjourney-inc",
    pricingModel: PricingModel.PAID,
    pricingAmount: 10,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Discord & web generation", "Upscaling", "Style tuning", "Character consistency"],
    categorySlugs: ["image-generation", "design"],
    tagSlugs: ["no-code"],
  },
  {
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    description:
      "An open-source image generation model from Stability AI that can be self-hosted or accessed through hosted APIs.",
    websiteUrl: "https://stability.ai",
    companySlug: "stability-ai",
    pricingModel: PricingModel.FREE,
    pricingAmount: null,
    billingFrequency: BillingFrequency.NA,
    features: ["Open weights", "Self-hostable", "ControlNet support", "Fine-tuning"],
    categorySlugs: ["image-generation"],
    tagSlugs: ["open-source", "api"],
  },
  {
    slug: "leonardo-ai",
    name: "Leonardo.Ai",
    description:
      "An AI image and asset generation platform aimed at game artists, designers, and marketers, with fine-tuned style models.",
    websiteUrl: "https://leonardo.ai",
    companySlug: "leonardo-ai",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 12,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Custom fine-tuned models", "Real-time canvas", "Texture generation", "API access"],
    categorySlugs: ["image-generation", "design"],
    tagSlugs: ["api", "free-trial"],
  },
  {
    slug: "adobe-firefly",
    name: "Adobe Firefly",
    description:
      "Adobe's generative AI model family for image, vector, and design generation, built into Photoshop, Illustrator, and Express.",
    websiteUrl: "https://www.adobe.com/products/firefly.html",
    companySlug: "adobe",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 9.99,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Generative Fill", "Text-to-image", "Text effects", "Commercially safe training data"],
    categorySlugs: ["image-generation", "design"],
    tagSlugs: ["enterprise"],
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    description:
      "An AI pair programmer built into major IDEs that suggests code, entire functions, and chat-based fixes in real time.",
    websiteUrl: "https://github.com/features/copilot",
    companySlug: "github",
    pricingModel: PricingModel.FREE_TRIAL,
    pricingAmount: 10,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Inline suggestions", "Chat", "CLI support", "Multi-file edits"],
    categorySlugs: ["coding", "productivity"],
    tagSlugs: ["api", "free-trial", "browser-extension"],
  },
  {
    slug: "cursor",
    name: "Cursor",
    description:
      "An AI-native code editor, forked from VS Code, built around fast multi-file edits and an agentic coding mode.",
    websiteUrl: "https://cursor.com",
    companySlug: "anysphere",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 20,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Agent mode", "Multi-file diffs", "Codebase-aware chat", "Tab autocomplete"],
    categorySlugs: ["coding"],
    tagSlugs: ["api", "free-trial"],
  },
  {
    slug: "replit",
    name: "Replit",
    description:
      "A browser-based IDE with an AI agent that can scaffold, build, and deploy full applications from natural language.",
    websiteUrl: "https://replit.com",
    companySlug: "replit",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 25,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Replit Agent", "Instant hosting", "Collaborative editor", "Database included"],
    categorySlugs: ["coding", "productivity"],
    tagSlugs: ["no-code", "free-trial"],
  },
  {
    slug: "tabnine",
    name: "Tabnine",
    description:
      "An AI code completion tool that can run fully private or self-hosted, aimed at enterprise engineering teams.",
    websiteUrl: "https://www.tabnine.com",
    companySlug: "tabnine",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 12,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Private code models", "On-prem deployment", "IDE plugins", "Team code standards"],
    categorySlugs: ["coding"],
    tagSlugs: ["enterprise", "api"],
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    description:
      "AI features built directly into Notion for drafting, summarizing, translating, and querying a team's workspace.",
    websiteUrl: "https://www.notion.so/product/ai",
    companySlug: "notion-labs",
    pricingModel: PricingModel.PAID,
    pricingAmount: 10,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Workspace Q&A", "Autofill", "Meeting notes", "Translation"],
    categorySlugs: ["productivity", "writing"],
    tagSlugs: ["enterprise"],
  },
  {
    slug: "gamma",
    name: "Gamma",
    description:
      "An AI presentation and document tool that turns a topic or outline into a designed deck, page, or webpage.",
    websiteUrl: "https://gamma.app",
    companySlug: "gamma",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 10,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Text-to-deck", "Theme engine", "One-click redesign", "Analytics"],
    categorySlugs: ["productivity", "design"],
    tagSlugs: ["no-code", "free-trial"],
  },
  {
    slug: "otter",
    name: "Otter.ai",
    description:
      "A meeting assistant that records, transcribes, and summarizes calls in real time with automated action items.",
    websiteUrl: "https://otter.ai",
    companySlug: "otter-ai",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 16.99,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Live transcription", "Auto summaries", "Speaker identification", "Calendar sync"],
    categorySlugs: ["productivity", "audio-voice"],
    tagSlugs: ["mobile-app", "free-trial"],
  },
  {
    slug: "zapier",
    name: "Zapier",
    description:
      "A no-code automation platform with AI-built workflows ('Zaps') and agents that connect thousands of apps.",
    websiteUrl: "https://zapier.com",
    companySlug: "zapier",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 19.99,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["7,000+ app integrations", "AI-built Zaps", "Custom agents", "Webhooks"],
    categorySlugs: ["productivity"],
    tagSlugs: ["no-code", "api", "free-trial"],
  },
  {
    slug: "jasper",
    name: "Jasper",
    description:
      "An AI content platform for marketing teams, built around brand voice, campaign briefs, and long-form copy.",
    websiteUrl: "https://www.jasper.ai",
    companySlug: "jasper",
    pricingModel: PricingModel.PAID,
    pricingAmount: 39,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Brand voice", "Campaign briefs", "SEO mode", "Team workflows"],
    categorySlugs: ["writing", "marketing"],
    tagSlugs: ["enterprise", "free-trial"],
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    description:
      "An AI copywriting and go-to-market workflow tool for marketing and sales teams, from blog posts to outbound emails.",
    websiteUrl: "https://www.copy.ai",
    companySlug: "copy-ai",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 36,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Workflow automation", "Brand voice", "Chat", "90+ copy templates"],
    categorySlugs: ["writing", "marketing"],
    tagSlugs: ["free-trial"],
  },
  {
    slug: "writesonic",
    name: "Writesonic",
    description:
      "An AI writing suite for blog posts, ads, and product descriptions, with a built-in SEO checker and Chrome extension.",
    websiteUrl: "https://writesonic.com",
    companySlug: "writesonic",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 19,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Article writer", "SEO checker", "Bulk generation", "Brand voice"],
    categorySlugs: ["writing", "marketing", "seo"],
    tagSlugs: ["chrome-extension", "free-trial"],
  },
  {
    slug: "grammarly",
    name: "Grammarly",
    description:
      "An AI writing assistant that checks grammar, tone, and clarity across the browser, desktop, and Office apps.",
    websiteUrl: "https://www.grammarly.com",
    companySlug: "grammarly",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 12,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Grammar & tone checks", "Generative rewrite", "Plagiarism detection", "Style guides"],
    categorySlugs: ["writing"],
    tagSlugs: ["browser-extension", "mobile-app"],
  },
  {
    slug: "surfer-seo",
    name: "Surfer SEO",
    description:
      "An SEO content tool that scores drafts against top-ranking pages and generates data-backed content briefs.",
    websiteUrl: "https://surferseo.com",
    companySlug: "surfer",
    pricingModel: PricingModel.PAID,
    pricingAmount: 89,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Content editor score", "SERP analyzer", "Content briefs", "Audit tool"],
    categorySlugs: ["seo", "marketing"],
    tagSlugs: ["free-trial"],
  },
  {
    slug: "runway",
    name: "Runway",
    description:
      "An AI video generation and editing suite used by filmmakers, offering text-to-video, motion brush, and green-screen tools.",
    websiteUrl: "https://runwayml.com",
    companySlug: "runway",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 15,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Text-to-video", "Motion brush", "Green screen", "Frame interpolation"],
    categorySlugs: ["video"],
    tagSlugs: ["api", "free-trial"],
  },
  {
    slug: "synthesia",
    name: "Synthesia",
    description:
      "An AI video platform that turns scripts into videos with realistic AI avatars, used heavily for training content.",
    websiteUrl: "https://www.synthesia.io",
    companySlug: "synthesia",
    pricingModel: PricingModel.PAID,
    pricingAmount: 29,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["230+ AI avatars", "140+ languages", "Screen recorder", "Brand kit"],
    categorySlugs: ["video"],
    tagSlugs: ["enterprise", "free-trial"],
  },
  {
    slug: "heygen",
    name: "HeyGen",
    description:
      "An AI video generator focused on realistic talking-head avatars and instant translation/dubbing for marketing teams.",
    websiteUrl: "https://www.heygen.com",
    companySlug: "heygen",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 29,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["AI avatars", "Video translation", "Voice cloning", "API access"],
    categorySlugs: ["video"],
    tagSlugs: ["api", "free-trial"],
  },
  {
    slug: "descript",
    name: "Descript",
    description:
      "An audio/video editor that works like a text document — cut clips by deleting transcript text, with AI voice cloning.",
    websiteUrl: "https://www.descript.com",
    companySlug: "descript",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 24,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Transcript-based editing", "Overdub voice cloning", "Studio Sound", "Screen recording"],
    categorySlugs: ["video", "audio-voice"],
    tagSlugs: ["free-trial"],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    description:
      "A text-to-speech and voice cloning platform producing highly realistic, multilingual AI voices, with a full dubbing API.",
    websiteUrl: "https://elevenlabs.io",
    companySlug: "elevenlabs",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 5,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Voice cloning", "29 languages", "Dubbing Studio", "Low-latency API"],
    categorySlugs: ["audio-voice"],
    tagSlugs: ["api", "free-trial"],
  },
  {
    slug: "murf-ai",
    name: "Murf AI",
    description:
      "An AI voiceover studio with 120+ realistic voices for videos, presentations, and e-learning, including a voice changer.",
    websiteUrl: "https://murf.ai",
    companySlug: "murf",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 23,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["120+ voices", "Voice changer", "Timeline editor", "Team collaboration"],
    categorySlugs: ["audio-voice"],
    tagSlugs: ["free-trial"],
  },
  {
    slug: "suno",
    name: "Suno",
    description:
      "An AI music generation app that creates full songs — vocals, lyrics, and instrumentation — from a text prompt.",
    websiteUrl: "https://suno.com",
    companySlug: "suno",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 10,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Full song generation", "Custom lyrics", "Stem export", "Commercial rights on paid plans"],
    categorySlugs: ["audio-voice"],
    tagSlugs: ["mobile-app", "free-trial"],
  },
  {
    slug: "character-ai",
    name: "Character.AI",
    description:
      "A platform for creating and chatting with AI characters with distinct personalities, popular for roleplay and companionship.",
    websiteUrl: "https://character.ai",
    companySlug: "character-ai",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 9.99,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Custom character creation", "Voice chat", "Group chats", "Mobile apps"],
    categorySlugs: ["chatbots"],
    tagSlugs: ["mobile-app"],
  },
  {
    slug: "poe",
    name: "Poe",
    description:
      "A multi-model chat platform from Quora that gives one subscription access to many AI models and bots in a single interface.",
    websiteUrl: "https://poe.com",
    companySlug: "quora",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 20,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Multi-model access", "Custom bots", "Group chat", "API compute points"],
    categorySlugs: ["chatbots"],
    tagSlugs: ["api", "mobile-app"],
  },
  {
    slug: "framer-ai",
    name: "Framer AI",
    description:
      "A website builder that generates full, editable landing pages from a text prompt, with production-grade hosting built in.",
    websiteUrl: "https://www.framer.com/ai",
    companySlug: "framer",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 15,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Text-to-site generation", "Visual editor", "CMS", "One-click publish"],
    categorySlugs: ["design", "productivity"],
    tagSlugs: ["no-code", "free-trial"],
  },
  {
    slug: "canva-magic-studio",
    name: "Canva Magic Studio",
    description:
      "Canva's suite of generative AI tools — Magic Write, Magic Design, and background removal — built into its design editor.",
    websiteUrl: "https://www.canva.com/magic-studio/",
    companySlug: "canva",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 15,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Magic Write", "Magic Design", "Background remover", "Brand kit"],
    categorySlugs: ["design", "marketing"],
    tagSlugs: ["mobile-app", "free-trial"],
  },
  {
    slug: "intercom-fin",
    name: "Intercom Fin",
    description: "An AI customer service bot that resolves customer questions instantly with accurate answers based on your support documents.",
    websiteUrl: "https://www.intercom.com/fin",
    companySlug: "intercom",
    pricingModel: PricingModel.PAID,
    pricingAmount: 0.99,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Instant resolutions", "Multi-source content sync", "Secure data protection", "Human handoff"],
    categorySlugs: ["customer-support"],
    tagSlugs: ["api", "enterprise"],
  },
  {
    slug: "chatbase",
    name: "Chatbase",
    description: "An AI chatbot builder that trains ChatGPT on your data, documents, and website to answer customer support queries in real time.",
    websiteUrl: "https://www.chatbase.co",
    companySlug: "chatbase",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 19,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["Custom training source", "Embeddable widget", "API access", "Leads capture"],
    categorySlugs: ["customer-support", "chatbots"],
    tagSlugs: ["api", "free-trial", "no-code"],
  },
  {
    slug: "tidio-lyro",
    name: "Tidio Lyro",
    description: "An conversational AI bot for small and medium businesses that answers customer questions instantly using your support articles.",
    websiteUrl: "https://www.tidio.com/lyro/",
    companySlug: "tidio",
    pricingModel: PricingModel.FREEMIUM,
    pricingAmount: 39,
    billingFrequency: BillingFrequency.MONTHLY,
    features: ["NLP routing", "Automated FAQ replies", "Interactive widget", "Live analytics"],
    categorySlugs: ["customer-support"],
    tagSlugs: ["free-trial", "no-code"],
  },
  {
    slug: "bark-audio",
    name: "Bark",
    description: "An open-source transformer-based audio generation model capable of highly realistic text-to-speech, background music, and ambient sound effects.",
    websiteUrl: "https://github.com/suno-ai/bark",
    companySlug: "suno",
    pricingModel: PricingModel.FREE,
    pricingAmount: null,
    billingFrequency: BillingFrequency.NA,
    features: ["Open weights", "Non-verbal communication (laughs, sighs)", "Multi-lingual support", "Voice cloning"],
    categorySlugs: ["audio-voice"],
    tagSlugs: ["open-source", "api"],
  },
  {
    slug: "audacity-ai",
    name: "Audacity AI Analyzer",
    description: "A free, open-source AI effects suite for Audacity that adds local music generation, voice styling, and text transcription features.",
    websiteUrl: "https://github.com/intel/openvino-plugins-audacity",
    companySlug: null,
    pricingModel: PricingModel.FREE,
    pricingAmount: null,
    billingFrequency: BillingFrequency.NA,
    features: ["Noise suppression", "Local compilation", "Whisper transcription", "OpenVINO acceleration"],
    categorySlugs: ["audio-voice"],
    tagSlugs: ["open-source", "no-code"],
  }
];

// ---------------------------------------------------------------------------
// Reviews — a handful of realistic sample reviews spread across popular tools
// ---------------------------------------------------------------------------

const REVIEWS: { toolSlug: string; rating: number; comment: string }[] = [
  { toolSlug: "chatgpt", rating: 5, comment: "Genuinely useful every day for drafting and debugging." },
  { toolSlug: "chatgpt", rating: 4, comment: "Great all-rounder, though it occasionally gets facts wrong without web browsing on." },
  { toolSlug: "claude", rating: 5, comment: "The long context window makes it my go-to for reviewing large codebases." },
  { toolSlug: "midjourney", rating: 5, comment: "Best-in-class image quality, but the Discord-only workflow took getting used to." },
  { toolSlug: "cursor", rating: 5, comment: "Agent mode saved me hours refactoring a legacy Next.js app." },
  { toolSlug: "notion-ai", rating: 4, comment: "Handy for quick summaries inside docs I already live in." },
  { toolSlug: "elevenlabs", rating: 5, comment: "Voice cloning quality is shockingly close to the source recordings." },
  { toolSlug: "perplexity", rating: 4, comment: "Citations make it easy to double check sources compared to a plain chatbot." },
];

async function main() {
  const companyBySlug = new Map<string, { id: string }>();
  console.log("Upserting companies...");
  for (const c of COMPANIES) {
    const company = await prisma.company.upsert({
      where: { slug: c.slug },
      update: { name: c.name, logoUrl: logoFor(c.domain) },
      create: { slug: c.slug, name: c.name, logoUrl: logoFor(c.domain) },
    });
    companyBySlug.set(c.slug, company);
  }
  console.log(`Upserted ${companyBySlug.size} companies.`);

  // Categories
  console.log("Upserting categories...");
  const categories = await Promise.all(
    CATEGORY_NAMES.map((name) =>
      prisma.category.upsert({
        where: { slug: slugify(name) },
        update: { name },
        create: { slug: slugify(name), name },
      })
    )
  );
  console.log(`Upserted ${categories.length} categories.`);

  // Tags
  console.log("Upserting tags...");
  const tags = await Promise.all(
    TAG_NAMES.map((name) =>
      prisma.tag.upsert({
        where: { slug: slugify(name) },
        update: { name },
        create: { slug: slugify(name), name },
      })
    )
  );
  console.log(`Upserted ${tags.length} tags.`);

  // Demo users (placeholder until Module 11 — Auth — owns real accounts)
  console.log("Upserting demo users...");
  const demoUsers = await Promise.all(
    [
      { email: "demo@example.com", name: "Demo User" },
      { email: "reviewer.one@example.com", name: "Aditi Rao" },
      { email: "reviewer.two@example.com", name: "Marcus Webb" },
    ].map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: { name: u.name },
        create: u,
      })
    )
  );
  console.log(`Upserted ${demoUsers.length} demo users.`);

  // Tools
  console.log("Upserting tools...");
  for (const t of TOOLS) {
    const { categorySlugs, tagSlugs, companySlug, pricingAmount, ...rest } = t;
    const logoUrl = logoFor(new URL(t.websiteUrl).hostname.replace(/^www\./, ""));
    const tool = await prisma.tool.upsert({
      where: { slug: t.slug },
      update: {
        ...rest,
        pricingAmount: pricingAmount ?? null,
        logoUrl,
        companyId: companySlug ? companyBySlug.get(companySlug)?.id : null,
      },
      create: {
        ...rest,
        pricingAmount: pricingAmount ?? null,
        logoUrl,
        companyId: companySlug ? companyBySlug.get(companySlug)?.id : null,
      },
    });

    for (const catSlug of categorySlugs) {
      const category = categories.find((c) => c.slug === catSlug);
      if (!category) throw new Error(`Unknown category slug "${catSlug}" on tool "${t.slug}"`);
      await prisma.toolCategory.upsert({
        where: { toolId_categoryId: { toolId: tool.id, categoryId: category.id } },
        update: {},
        create: { toolId: tool.id, categoryId: category.id },
      });
    }

    for (const tagSlug of tagSlugs) {
      const tag = tags.find((tg) => tg.slug === tagSlug);
      if (!tag) throw new Error(`Unknown tag slug "${tagSlug}" on tool "${t.slug}"`);
      await prisma.toolTag.upsert({
        where: { toolId_tagId: { toolId: tool.id, tagId: tag.id } },
        update: {},
        create: { toolId: tool.id, tagId: tag.id },
      });
    }
    console.log(`Upserted tool: ${t.slug}`);
  }

  // A few curated alternative pairings so "Similar tools" has explicit data
  // to prefer over the category-overlap heuristic.
  const ALTERNATIVE_PAIRS: [string, string][] = [
    ["chatgpt", "claude"],
    ["chatgpt", "gemini"],
    ["claude", "gemini"],
    ["midjourney", "stable-diffusion"],
    ["midjourney", "leonardo-ai"],
    ["github-copilot", "cursor"],
    ["github-copilot", "tabnine"],
    ["jasper", "copy-ai"],
    ["jasper", "writesonic"],
    ["runway", "heygen"],
    ["elevenlabs", "murf-ai"],
  ];

  for (const [aSlug, bSlug] of ALTERNATIVE_PAIRS) {
    const a = await prisma.tool.findUnique({ where: { slug: aSlug } });
    const b = await prisma.tool.findUnique({ where: { slug: bSlug } });
    if (!a || !b) continue;
    await prisma.tool.update({
      where: { id: a.id },
      data: { alternatives: { connect: { id: b.id } } },
    });
  }

  // Reviews
  for (const [i, r] of REVIEWS.entries()) {
    const tool = await prisma.tool.findUnique({ where: { slug: r.toolSlug } });
    if (!tool) continue;
    const user = demoUsers[i % demoUsers.length];
    if (!user) continue;

    await prisma.review.upsert({
      where: { toolId_userId: { toolId: tool.id, userId: user.id } },
      update: { rating: r.rating, comment: r.comment },
      create: { toolId: tool.id, userId: user.id, rating: r.rating, comment: r.comment },
    });
  }

  // Recompute avgRating / reviewCount per tool from actual Review rows so the
  // denormalized fields always match reality (see contract note in schema.prisma).
  const toolsWithReviews = await prisma.tool.findMany({
    select: { id: true, reviews: { select: { rating: true } } },
  });
  for (const t of toolsWithReviews) {
    const count = t.reviews.length;
    const avg = count > 0 ? t.reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
    await prisma.tool.update({
      where: { id: t.id },
      data: { avgRating: avg, reviewCount: count },
    });
  }

  console.log(`Seed complete: ${COMPANIES.length} companies, ${TOOLS.length} tools, ${REVIEWS.length} reviews.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });