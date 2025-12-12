// Security utilities for input sanitization and XSS prevention

/**
 * Sanitizes user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates that a string contains only expected characters
 */
export function validateGreekInput(input: string): boolean {
  // Allow Greek letters (including polytonic), Latin letters, numbers, spaces, and common punctuation
  const greekPattern = /^[\u0370-\u03FF\u1F00-\u1FFF\u0300-\u036Fa-zA-Z0-9\s.,;:!?'"()-]*$/;
  return greekPattern.test(input);
}

/**
 * Rate limiting helper for client-side throttling
 */
export function createRateLimiter(maxRequests: number, windowMs: number) {
  const requests: number[] = [];
  
  return function isAllowed(): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Remove old requests
    while (requests.length > 0 && requests[0] < windowStart) {
      requests.shift();
    }
    
    if (requests.length >= maxRequests) {
      return false;
    }
    
    requests.push(now);
    return true;
  };
}

/**
 * Validates URL to prevent open redirect attacks
 */
export function isValidInternalUrl(url: string): boolean {
  if (!url) return false;
  
  // Only allow relative paths starting with /
  if (url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }
  
  return false;
}

/**
 * Generates a simple CSRF token for form submissions
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Content Security Policy headers (for reference when deploying)
 */
export const CSP_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ')
};
