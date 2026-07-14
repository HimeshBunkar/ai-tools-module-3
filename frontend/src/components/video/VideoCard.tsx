"use client";

import { useState } from "react";
import type { Video } from "@/types/video";

function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return String(views);
}

function formatHours(hours: number): string {
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: "var(--highlight-top)",
      }}
    >
      {/* Video area */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          position: "relative",
          background: "var(--bg-surface-2)",
          cursor: "pointer",
        }}
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            src={`${video.videoUrl}?autoplay=1`}
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M5 3.5L13 8L5 12.5V3.5Z" fill="white" />
                </svg>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                background: "rgba(0,0,0,0.72)",
                color: "white",
                fontSize: "0.75rem",
                padding: "3px 6px",
                borderRadius: "4px",
              }}
            >
              {video.duration}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
            {video.channel}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-quaternary)" }}>
            {formatHours(video.hours)}
          </span>
        </div>

        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 8px", lineHeight: 1.4 }}>
          {video.title}
        </p>

        <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", margin: "0 0 12px", lineHeight: 1.5 }}>
          {video.description}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {video.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              style={{
                fontSize: "0.75rem",
                color: "var(--text-tertiary)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "999px",
                padding: "3px 8px",
              }}
            >
              {topic}
            </span>
          ))}
        </div>

        <div style={{ fontSize: "0.75rem", color: "var(--text-quaternary)" }}>
          {formatViews(video.views)} views · {video.duration}
        </div>
      </div>
    </div>
  );
}