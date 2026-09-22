// One icon family (Phosphor, regular weight) for the whole site.
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  CaretDownIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  PlusIcon,
  XLogoIcon,
  FacebookLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

const size = 18;

export const ArrowRight = () => <ArrowRightIcon size={size} aria-hidden />;
export const ArrowUp = () => <ArrowUpIcon size={size} aria-hidden />;
export const ArrowUpRight = () => <ArrowUpRightIcon size={size} aria-hidden />;
export const CaretDown = () => <CaretDownIcon size={16} aria-hidden />;
export const Plus = () => <PlusIcon size={size} aria-hidden />;

export const SocialIcon = ({ name }: { name: string }) => {
  const p = { size: 22, "aria-hidden": true } as const;
  if (name === "LinkedIn") return <LinkedinLogoIcon {...p} />;
  if (name === "Instagram") return <InstagramLogoIcon {...p} />;
  if (name === "Facebook") return <FacebookLogoIcon {...p} />;
  return <XLogoIcon {...p} />;
};
