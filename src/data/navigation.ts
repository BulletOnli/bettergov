import { NavigationItem } from '../types';

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Philippines',
    href: '/philippines',
    children: [
      { label: 'About the Philippines', href: '/philippines/about' },
      { label: 'History', href: '/philippines/history' },
      { label: 'Culture', href: '/philippines/culture' },
      { label: 'Regions', href: '/philippines/regions' },
      { label: 'Tourism', href: '/philippines/tourism' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Citizenship & Civil Registry', href: '/services/citizenship' },
      { label: 'Business & Employment', href: '/services/business' },
      { label: 'Health & Social Welfare', href: '/services/health' },
      { label: 'Education', href: '/services/education' },
      { label: 'Transportation', href: '/services/transportation' },
      { label: 'Housing & Land', href: '/services/housing' },
    ],
  },
  {
    label: 'Travel',
    href: '/travel',
    children: [
      { label: 'Travel Guidelines', href: '/travel/guidelines' },
      { label: 'Visa Information', href: '/travel/visa' },
      { label: 'Tourist Destinations', href: '/travel/destinations' },
      { label: 'Transportation', href: '/travel/transportation' },
      { label: 'Travel Advisories', href: '/travel/advisories' },
    ],
  },
  {
    label: 'Government',
    href: '/government',
    children: [
      { label: 'Executive', href: '/government/executive' },
      { label: 'Legislative', href: '/government/legislative' },
      { label: 'Judiciary', href: '/government/judiciary' },
      { label: 'Agencies & Offices', href: '/government/agencies' },
      { label: 'Local Government', href: '/government/local' },
      { label: 'Officials Directory', href: '/government/officials' },
    ],
  },
];

export const footerNavigation = {
  mainSections: [
    {
      title: 'About',
      links: [
        { label: 'About the Portal', href: '/about' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Use', href: '/terms' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        { label: 'Popular Services', href: '/services/popular' },
        { label: 'Service Directory', href: '/services/directory' },
        { label: 'Forms', href: '/forms' },
        { label: 'Payments', href: '/payments' },
      ],
    },
    {
      title: 'Government',
      links: [
        { label: 'Transparency', href: '/transparency' },
        { label: 'Open Data', href: '/data' },
        { label: 'Procurement', href: '/procurement' },
        { label: 'Budget', href: '/budget' },
        { label: 'Jobs', href: '/jobs' },
      ],
    },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com/govph' },
    { label: 'Twitter', href: 'https://twitter.com/govph' },
    { label: 'Instagram', href: 'https://instagram.com/govph' },
    { label: 'YouTube', href: 'https://youtube.com/govph' },
  ],
};