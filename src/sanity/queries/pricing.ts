import { groq } from "next-sanity";

export const PRICING_QUERY = groq`
  *[_type == "pricingService"] | order(order asc) {
    _id, key, items
  }
`;
