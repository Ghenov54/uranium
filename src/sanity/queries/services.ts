import { groq } from "next-sanity";

export const SERVICE_ITEMS_QUERY = groq`
  *[_type == "serviceItem"] | order(order asc) {
    _id, name, slug, tagline, description, tags, features
  }
`;

export const SERVICE_ITEM_QUERY = groq`
  *[_type == "serviceItem" && slug.current == $slug][0] {
    _id, name, slug, tagline, description, tags, features
  }
`;

export const SERVICE_SLUGS_QUERY = groq`
  *[_type == "serviceItem" && defined(slug.current)] {
    "slug": slug.current
  }
`;
