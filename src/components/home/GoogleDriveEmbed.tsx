"use client";

interface GoogleDriveEmbedProps {
  fileId: string;
  title?: string;
  className?: string;
}

export function GoogleDriveEmbed({
  fileId,
  title = "Video",
  className = "",
}: GoogleDriveEmbedProps) {
  return (
    <div
      className={`relative w-full bg-black overflow-hidden rounded-lg ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      <video
        className="w-full h-full object-cover"
        controls
        autoPlay={false}
        controlsList="nodownload"
      >
        <source
          src={`https://drive.google.com/uc?id=${fileId}&export=download`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
