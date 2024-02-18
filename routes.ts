/**
 * An Array of routes that are accessible to the public
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/email-verification'];
/**
 * An Array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
  '/login',
  '/register',
  '/auth/forgot-password',
  '/auth/reset-password',
];
/**
 * The prefix for API authentication routes
 * Toutes that start with this prefix are used for API AUTHENTICATION purposes
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth';
/**
 * The default redirect after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/settings';
