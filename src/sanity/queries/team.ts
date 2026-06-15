import { groq } from "next-sanity";

export const TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, bio, photo
  }
`;
