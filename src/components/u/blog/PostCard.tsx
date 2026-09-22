import Link from "next/link";

export type BlogPost = {
  id: string;
  title: string;
  href: string;
  image: string | null;
  imageWide: string | null;
  category: string;
  date: string | null;
  minutes: number | null;
};

/** Clay's article card: image, small category, title, then date and reading time. */
export function PostCard({ post, size = "sm", minLabel, fmt }: { post: BlogPost; size?: "lg" | "md" | "sm"; minLabel: string; fmt: Intl.DateTimeFormat }) {
  const src = size === "lg" ? post.imageWide ?? post.image : post.image;
  return (
    <Link href={post.href} className="u-post" data-size={size}>
      <div className="u-post__media">
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" loading="lazy" decoding="async" />
        )}
      </div>
      <span className="u-post__cat">{post.category}</span>
      <h3 className="u-post__title">{post.title}</h3>
      <span className="u-post__meta u-tnum">
        {post.date ? fmt.format(new Date(post.date)) : ""}
        {post.minutes ? ` · ${post.minutes} ${minLabel}` : ""}
      </span>
    </Link>
  );
}
