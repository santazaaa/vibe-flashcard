// AdSense configuration - Update these with real values from adsense.google.com
// IMPORTANT: Replace placeholders before production deployment
export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-XXXXXXXXXXXXXXXX', // Your Publisher ID
  adUnits: {
    headerBanner: 'HEADER_BANNER_SLOT', // Ad unit ID (numeric, e.g., '1234567890')
    footerBanner: 'FOOTER_BANNER_SLOT',
    sidebarRectangle: 'SIDEBAR_RECTANGLE_SLOT',
  },
} as const;