import type { Metadata } from "next";
import { VideoListingClient } from "@/components/video/VideoListingsClient";
import { mockVideos } from "@/lib/video/mockVideos";

export const metadata: Metadata = {
  title: "AI Videos — The AI Signal",
  description: "Watch the latest AI videos, tutorials, demos and talks.",
};

export default function VideoPage() {
  return <VideoListingClient videos={mockVideos} />;
}