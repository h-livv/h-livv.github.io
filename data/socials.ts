import { Code, Briefcase, Mail, type LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const socials: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/h-livv',
    icon: Code
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/harlivsingh/',
    icon: Briefcase
  },
  {
    name: 'Email',
    href: 'mailto:harliv.research@gmail.com',
    icon: Mail
  }
];
