"use client";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function YouTubeEmbed({ videoId, title = "Video", className = "" }: YouTubeEmbedProps) {
  return (
    <div className={`relative w-full bg-black overflow-hidden rounded-lg ${className}`} style={{ aspectRatio: "16/9" }}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0"
      ></iframe>
    </div>
  );
}
