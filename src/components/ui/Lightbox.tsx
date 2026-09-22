"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";

type Props = {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 400;

/**
 * Full-screen image viewer. Swipe (touch or mouse drag) to move between images,
 * swipe down to close, and a click or tap anywhere outside the image closes it.
 */
export function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const reduce = useReducedMotion();
  const [dir, setDir] = useState(0);

  const prev = useCallback(() => {
    setDir(-1);
    onPrev();
  }, [onPrev]);
  const next = useCallback(() => {
    setDir(1);
    onNext();
  }, [onNext]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [onClose, prev, next]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [handleKey]);

  if (!images[index]) return null;
  const many = images.length > 1;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.y) > Math.abs(offset.x) && (offset.y > 120 || velocity.y > 600)) return onClose();
    if (!many) return;
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) next();
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) prev();
  };

  // Clicks on the backdrop or empty stage close; clicks on the image or controls do not.
  const closeIfBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="u-lb" role="dialog" aria-modal="true" onClick={closeIfBackdrop}>
      <div className="u-lb__bar" onClick={closeIfBackdrop}>
        <span className="u-tnum">
          {index + 1} / {images.length}
        </span>
        <button type="button" className="u-lb__btn" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="u-lb__stage" onClick={closeIfBackdrop}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${index + 1} / ${images.length}`}
            className="u-lb__img"
            custom={dir}
            draggable={false}
            drag={reduce ? false : true}
            dragSnapToOrigin
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            initial={reduce ? false : { opacity: 0, x: dir * 120, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -120, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        {many && (
          <>
            <button type="button" className="u-lb__btn u-lb__nav u-lb__nav--prev" onClick={prev} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button type="button" className="u-lb__btn u-lb__nav u-lb__nav--next" onClick={next} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {many && (
        <div className="u-lb__thumbs" onClick={closeIfBackdrop}>
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => {
                const diff = i - index;
                setDir(Math.sign(diff));
                if (diff > 0) for (let j = 0; j < diff; j++) onNext();
                else for (let j = 0; j < -diff; j++) onPrev();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
