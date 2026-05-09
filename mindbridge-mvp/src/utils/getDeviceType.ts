export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'; // SSR
  
  const width = window.innerWidth;
  
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
}

export function isMobile(): boolean {
  return getDeviceType() === 'mobile';
}

export function isTablet(): boolean {
  return getDeviceType() === 'tablet';
}

export function isDesktop(): boolean {
  return getDeviceType() === 'desktop';
}
