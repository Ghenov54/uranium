import { groq } from "next-sanity";

export const PORTFOLIO_ITEMS_QUERY = groq`
  *[_type == "portfolioItem"] | order(order asc) {
    _id, title, category, categoryLabel, mainImage, color, slug
  }
`;

export const PORTFOLIO_ITEM_QUERY = groq`
  *[_type == "portfolioItem" && slug.current == $slug][0] {
    _id, title, slug, category, categoryLabel,
    mainImage, color, description, client, year, results,
    gallery[]{ asset, caption }
  }
`;

export const PORTFOLIO_RELATED_QUERY = groq`
  *[_type == "portfolioItem" && slug.current != $slug && category == $category]
  | order(order asc)[0...3] {
    _id, title, category, categoryLabel, mainImage, color, slug
  }
`;
