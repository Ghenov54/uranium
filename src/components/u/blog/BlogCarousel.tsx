"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "../icons";

export type CarouselPost = { id: string; title: string; href: string; image: string | null; category: string };

/** Clay's featured strip: large image cards that snap horizontally, driven by arrows or swipe. */
export function BlogCarousel({ posts, prevLabel, nextLabel }: { posts: CarouselPost[]; prevLabel: string; nextLabel: string }) {
  const track = useRef<HTMLUListElement>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="u-bcar">
      <div className="u-bcar__arrows">
        <button type="button" onClick={() => step(-1)} aria-label={prevLabel} className="u-bcar__prev">
          <ArrowRight />
        </button>
        <button type="button" onClick={() => step(1)} aria-label={nextLabel}>
          <ArrowRight />
        </button>
      </div>
      <ul ref={track} className="u-bcar__track" data-lenis-prevent>
        {posts.map((p) => (
          <li key={p.id}>
            <Link href={p.href} className="u-bcar__card">
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt="" loading="lazy" decoding="async" />
              )}
              <span className="u-bcar__shade" aria-hidden />
              <span className="u-bcar__text">
                <span className="u-bcar__cat">{p.category}</span>
                <span className="u-bcar__title">{p.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
