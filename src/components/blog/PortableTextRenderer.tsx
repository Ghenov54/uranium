"use client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  value: unknown[];
};

const components = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt ?? ""}
            className="w-full rounded-2xl object-cover"
          />
          {value.alt && (
            <figcaption
              className="mt-2 text-center text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2
        className="mb-4 mt-8 text-2xl font-black uppercase tracking-tight"
        style={{ color: "var(--color-text-primary)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3
        className="mb-3 mt-6 text-xl font-black uppercase tracking-tight"
        style={{ color: "var(--color-text-primary)" }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote
        className="my-6 border-l-4 py-2 pl-6 italic"
        style={{ borderColor: "var(--color-accent)", color: "var(--color-text-muted)" }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold" style={{ color: "var(--color-text-primary)" }}>
        {children}
      </strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic" style={{ color: "var(--color-text-primary)" }}>{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code
        className="rounded px-1.5 py-0.5 font-mono text-sm"
        style={{ background: "var(--color-bg-surface)", color: "var(--color-accent)" }}
      >
        {children}
      </code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="underline transition-colors"
        style={{ color: "var(--color-accent)" }}
      >
        {children}
      </a>
    ),
  },
};

export function PortableTextRenderer({ value }: Props) {
  return (
    <PortableText
      value={value as Parameters<typeof PortableText>[0]["value"]}
      components={components}
    />
  );
}
