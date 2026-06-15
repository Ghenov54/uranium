import { groq } from "next-sanity";

export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && (language == $locale || !defined(language))]
  | order(publishedAt desc)[0...20] {
    _id, title, slug, excerpt, mainImage, publishedAt, tags, language
  }
`;

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug && language == $locale][0] {
    _id, title, slug, excerpt, mainImage, body, publishedAt, tags
  }
`;

export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && language == $locale && slug.current != $slug
    && count((tags[])[@ in $tags]) > 0]
  | order(publishedAt desc)[0...3] {
    _id, title, slug, excerpt, mainImage, publishedAt
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    "locale": language
  }
`;
