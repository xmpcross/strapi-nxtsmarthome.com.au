/**
 * DataForSEO Google Shopping API Client & Comprehensive Data Schema
 * Location Code: 2036 (Australia)
 * Language Code: en
 */

export interface DataForSeoCredentials {
  login: string;
  password: string;
}

export interface DataForSeoShoppingParams {
  keyword: string;
  location_code?: number; // 2036 for Australia
  language_code?: string; // 'en'
  depth?: number; // up to 700 items per call
  search_param?: string;
}

export interface DataForSeoSeller {
  seller?: string;
  domain?: string;
  price?: number;
  url?: string;
  seller_rating?: number;
  delivery_info?: string;
  condition?: string;
}

export interface DataForSeoRating {
  value?: number;
  votes_count?: number;
}

export interface DataForSeoProductItem {
  type?: string;
  title?: string;
  product_id?: string;
  product_annotation?: string;
  brand?: string;
  description?: string;
  snippet?: string;
  price?: number;
  low_price?: number;
  high_price?: number;
  currency?: string;
  rating?: DataForSeoRating;
  seller?: string;
  domain?: string;
  url?: string;
  image_url?: string;
  profile_image_url?: string;
  additional_images?: string[];
  gtin?: string;
  gtins?: string[];
  mpn?: string;
  sellers?: DataForSeoSeller[];
  special_offer?: string;
  badge?: string;
  specifications?: Record<string, string>;
  attributes?: Record<string, string>;
  delivery_info?: string;
  rawApiData?: Record<string, unknown>;
}

export const DATAFORSEO_API_URL = 'https://api.dataforseo.com/v3/merchant/google/products/live';
export const DATAFORSEO_AU_LOCATION_CODE = 2036;

/**
 * Checks if DataForSEO API credentials are set in environment
 */
export function isDataForSeoConfigured(): boolean {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  return Boolean(login && password && login.trim() !== '' && password.trim() !== '');
}

/**
 * Gets DataForSEO credentials from environment if available
 */
export function getDataForSeoCredentials(): DataForSeoCredentials | null {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;

  if (login && password && login.trim() !== '' && password.trim() !== '') {
    return { login: login.trim(), password: password.trim() };
  }
  return null;
}

/**
 * Formats DataForSEO Basic Authentication header
 */
export function getDataForSeoAuthHeader(credentials: DataForSeoCredentials): string {
  const auth = Buffer.from(`${credentials.login}:${credentials.password}`).toString('base64');
  return `Basic ${auth}`;
}
