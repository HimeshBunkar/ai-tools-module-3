export interface VideoSource {
  name: string;
  domain: string;
  color: string;
  logoUrl: string | null;
}

export interface VideoCategory {
  key: string;
  label: string;
  count: number;
}

export interface VideoFilterChip {
  id: string;
  label: string;
}

export interface VideoRecord {
  id: string;
  title: string;
  description: string;
  aiSummary: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  topics: string[];
  source: string;
  channel: string;
  hours: number;
  duration: string;
  views: number;
  up: number;
  down: number;
  filters: string[];
}

export interface Video extends VideoRecord {
  score: number;
}

export type VideoSortKey = "title" | "topics" | "date" | "source" | "views";
export type SortDir = "asc" | "desc";

export interface VideoSortState {
  key: VideoSortKey;
  dir: SortDir;
}

export interface VideoFilterOption {
  value: string;
  label: string;
  count: number;
}