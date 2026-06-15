import { groq } from "next-sanity";

export const PORTFOLIO_ITEMS_QUERY = groq`
  *[_type == "portfolioItem"] | order(order asc) {
    _id, title, category, categoryLabel, mainImage, color
  }
`;
