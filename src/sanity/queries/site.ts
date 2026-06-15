import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    logoText, tagline, email, phone, address, workingHours,
    linkedinUrl, twitterUrl, instagramUrl
  }
`;

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    heroTitle, heroSubtitle, heroCta,
    servicesLabel, servicesHeading,
    portfolioLabel, portfolioHeading,
    ctaTitle, ctaSubtitle, ctaButton
  }
`;
