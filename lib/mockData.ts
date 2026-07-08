export interface AIModel {
  id: string;
  name: string;
  creator: string;
  contextWindow: string;
  parameterSize: string;
  modality: string;
  releaseDate: string;
  description: string;
}

export interface AINews {
  id: string;
  title: string;
  source: string;
  category: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  url: string;
}

export interface AIRepository {
  id: string;
  name: string;
  owner: string;
  stars: number;
  language: string;
  description: string;
  url: string;
}

export interface AIVideo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  publishedAt: string;
  url: string;
}

export interface AIEntity {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  year: string;
  description: string;
  imageUrl: string;
}

// ---------------------------------------------------------------------------
// Mock Data definitions
// ---------------------------------------------------------------------------

export const STATS = [
  { label: "AI Tools", value: "50K+", description: "Verified software applications" },
  { label: "Companies", value: "7K+", description: "Global AI builders & research labs" },
  { label: "Tasks", value: "10K+", description: "Automated business operations" },
  { label: "Models", value: "1K+", description: "Large neural network model architectures" },
  { label: "News Articles", value: "5K+", description: "Daily curated industry reports" },
  { label: "Videos", value: "7K+", description: "Video tutorials & walkthroughs" },
  { label: "Repositories", value: "20K+", description: "Open source code packages" },
  { label: "Robots", value: "500+", description: "Humanoids & automation systems" },
  { label: "Devices", value: "200+", description: "Consumer hardware & compute rigs" },
];

export const ENTITY_NAV = [
  { label: "AI Tools", href: "#tools" },
  { label: "Companies", href: "#companies" },
  { label: "Models", href: "#models" },
  { label: "Tasks", href: "#tasks" },
  { label: "News", href: "#news" },
  { label: "Videos", href: "#videos" },
  { label: "Collections", href: "/tools" }, // Direct link to tools
  { label: "Repositories", href: "#repos" },
  { label: "Robotics", href: "#robotics" },
  { label: "Devices", href: "#devices" },
];

export const MOCK_MODELS: AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    creator: "OpenAI",
    contextWindow: "128K tokens",
    parameterSize: "N/A (Proprietary)",
    modality: "Text, Audio, Vision",
    releaseDate: "May 2024",
    description: "OpenAI's flagship multimodal model, offering real-time conversational voice capabilities and high performance across vision tasks.",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    creator: "Anthropic",
    contextWindow: "200K tokens",
    parameterSize: "N/A (Proprietary)",
    modality: "Text, Vision",
    releaseDate: "June 2024",
    description: "State-of-the-art reasoning and coding capabilities, featuring the interactive 'Artifacts' environment for live document editing.",
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    creator: "Google",
    contextWindow: "2M tokens",
    parameterSize: "N/A (Proprietary)",
    modality: "Text, Vision, Audio, Code",
    releaseDate: "April 2024",
    description: "Features a massive 2-million token context window, allowing users to upload full codebases or hours of video content at once.",
  },
  {
    id: "llama-3-1-405b",
    name: "Llama 3.1 405B",
    creator: "Meta",
    contextWindow: "128K tokens",
    parameterSize: "405 Billion",
    modality: "Text, Code",
    releaseDate: "July 2024",
    description: "Meta's flagship open-weights model, rivaling top proprietary models in coding, multilingual tasks, and complex reasoning.",
  },
];

export const MOCK_NEWS: AINews[] = [
  {
    id: "news-1",
    title: "OpenAI Announces SearchGPT Prototype",
    source: "TechCrunch",
    category: "Search & Retrieval",
    publishedAt: "2 hours ago",
    readTime: "3 min read",
    summary: "OpenAI is testing a new search tool designed to give users fast, timely answers with cited links to web publications.",
    url: "https://openai.com/blog/searchgpt-prototype",
  },
  {
    id: "news-2",
    title: "Next.js 15 Released with Turbopack and React 19 Support",
    source: "Vercel Blog",
    category: "Web Development",
    publishedAt: "1 day ago",
    readTime: "5 min read",
    summary: "Vercel brings Next.js 15 to production with default caching updates, compiler changes, and React Server Components improvements.",
    url: "https://nextjs.org/blog/next-15",
  },
  {
    id: "news-3",
    title: "Anthropic Introduces Claude 3.5 Sonnet Artifacts on Mobile Apps",
    source: "VentureBeat",
    category: "LLM Interface",
    publishedAt: "3 days ago",
    readTime: "4 min read",
    summary: "Users can now interact with, view, and edit React layouts, SVGs, and documents built by Claude inside their mobile phone app.",
    url: "https://anthropic.com/news/claude-3-5-sonnet",
  },
  {
    id: "news-4",
    title: "Boston Dynamics Spotlights New Fully Electric Atlas Humanoid",
    source: "Robotics World",
    category: "Robotics",
    publishedAt: "1 week ago",
    readTime: "6 min read",
    summary: "Boston Dynamics retires the hydraulic Atlas and debuts a completely electric model with advanced range of motion and joint pivots.",
    url: "https://bostondynamics.com",
  },
];

export const MOCK_REPOS: AIRepository[] = [
  {
    id: "repo-1",
    name: "bark",
    owner: "suno-ai",
    stars: 32400,
    language: "Python",
    description: "Transformer-based audio generation model capable of highly realistic multi-lingual text-to-speech and sound effects.",
    url: "https://github.com/suno-ai/bark",
  },
  {
    id: "repo-2",
    name: "stable-diffusion-webui",
    owner: "AUTOMATIC1111",
    stars: 131800,
    language: "Python",
    description: "A comprehensive browser interface built on Gradio for running Stable Diffusion text-to-image and image-to-image models.",
    url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
  },
  {
    id: "repo-3",
    name: "ComfyUI",
    owner: "comfyanonymous",
    stars: 48900,
    language: "Python",
    description: "A powerful, modular node-based graphic interface for running diffusion models in customizable, complex workflows.",
    url: "https://github.com/comfyanonymous/ComfyUI",
  },
  {
    id: "repo-4",
    name: "transformers",
    owner: "huggingface",
    stars: 129000,
    language: "Python",
    description: "State-of-the-art Machine Learning architectures (BERT, GPT, LLaMA, Whisper) for PyTorch, TensorFlow, and JAX.",
    url: "https://github.com/huggingface/transformers",
  },
];

export const MOCK_VIDEOS: AIVideo[] = [
  {
    id: "vid-1",
    title: "Cursor AI Editor Tutorial: Build a Full App in 10 Minutes",
    channel: "CodeCraft",
    duration: "10:24",
    views: "120K views",
    publishedAt: "2 weeks ago",
    url: "https://youtube.com",
  },
  {
    id: "vid-2",
    title: "Midjourney v6 Advanced Prompting: Master the New Aesthetic Parameters",
    channel: "DesignVibe",
    duration: "15:45",
    views: "85K views",
    publishedAt: "1 month ago",
    url: "https://youtube.com",
  },
  {
    id: "vid-3",
    title: "How Next.js 15 Server Actions Work: A Deep Dive Guide",
    channel: "Vercel Community",
    duration: "21:12",
    views: "60K views",
    publishedAt: "3 weeks ago",
    url: "https://youtube.com",
  },
  {
    id: "vid-4",
    title: "Inside Figure 01: The OpenAI-Powered Humanoid Robot at Work",
    channel: "TechFuture",
    duration: "8:50",
    views: "230K views",
    publishedAt: "2 months ago",
    url: "https://youtube.com",
  },
];

export const MOCK_ROBOTS: AIEntity[] = [
  {
    id: "robot-1",
    name: "Figure 02",
    category: "Humanoid Robot",
    manufacturer: "Figure AI",
    year: "2024",
    description: "A commercial-grade humanoid robot powered by OpenAI speech-to-speech models, designed for factory logistics and tasks.",
    imageUrl: "/figure-02.jpg",
  },
  {
    id: "robot-2",
    name: "Unitree H1",
    category: "Bipedal Humanoid",
    manufacturer: "Unitree Robotics",
    year: "2023",
    description: "A bipedal robot capable of running, backflips, and walking up stairs, utilizing deep reinforcement learning control loops.",
    imageUrl: "/unitree-h1.jpg",
  },
];

export const MOCK_DEVICES: AIEntity[] = [
  {
    id: "device-1",
    name: "Rabbit r1",
    category: "AI Pocket Assistant",
    manufacturer: "Rabbit Inc.",
    year: "2024",
    description: "A pocket companion device utilizing a Large Action Model (LAM) designed to execute online app actions on your behalf.",
    imageUrl: "/rabbit-r1.jpg",
  },
  {
    id: "device-2",
    name: "Humane AI Pin",
    category: "Wearable Projector Pin",
    manufacturer: "Humane",
    year: "2024",
    description: "A wearable pin that projects digital interface layouts onto the palm of your hand, featuring voice and gesture inputs.",
    imageUrl: "/ai-pin.jpg",
  },
];
