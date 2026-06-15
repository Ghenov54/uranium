"use client";
import { useEffect, useCallback } from "react";

type Props = {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!images[index]) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: "rgba(0,0,0,0.97)" }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex shrink-0 items-center justify-between px-6 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm font-medium text-white/50">
          {index + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main image */}
      <div
        className="relative flex flex-1 items-center justify-center px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={index}
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="max-h-full max-w-full rounded-2xl object-contain"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        />

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-3 flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/70 backdrop-blur-sm transition-all hover:border-white hover:bg-black/70 hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-3 flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/70 backdrop-blur-sm transition-all hover:border-white hover:bg-black/70 hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="flex shrink-0 items-center justify-center gap-2 px-6 py-4"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => {
                const diff = i - index;
                if (diff > 0) for (let j = 0; j < diff; j++) onNext();
                else if (diff < 0) for (let j = 0; j < -diff; j++) onPrev();
              }}
              className="overflow-hidden rounded-lg transition-all"
              style={{
                width: 56,
                height: 40,
                border: i === index ? "2px solid var(--color-accent)" : "2px solid rgba(255,255,255,0.15)",
                opacity: i === index ? 1 : 0.5,
              }}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
