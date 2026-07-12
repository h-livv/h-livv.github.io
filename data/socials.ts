import { Code, Briefcase, Mail, type LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const socials: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Code
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Briefcase
  },
  {
    name: 'Email',
    href: 'mailto:hello@example.com',
    icon: Mail
  }
];
