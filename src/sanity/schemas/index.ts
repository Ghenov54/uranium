import { localeString } from "./localeString";
import { localeText } from "./localeText";
import { blockContent } from "./blockContent";
import { post } from "./post";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { portfolioItem } from "./portfolioItem";
import { serviceItem } from "./serviceItem";
import { teamMember } from "./teamMember";
import { pricingService } from "./pricingService";

export const schema = {
  types: [
    localeString,
    localeText,
    blockContent,
    post,
    siteSettings,
    homePage,
    portfolioItem,
    serviceItem,
    teamMember,
    pricingService,
  ],
};
