export function pickByEnv({ dev, prod, override, fallback }) {
  if (override) return override;
  return process.env.NODE_ENV === 'development'
    ? dev ?? fallback
    : prod ?? fallback; 
}

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_GRAPHQL_DEVELOPMENT_ENDPOINT ||
      'https://api.middler.com/graphql'
    : process.env.NEXT_PUBLIC_GRAPHQL_PRODUCTION_ENDPOINT ||
      'https://api.middler.com/graphql';

export const SITE_URL = pickByEnv({
  dev: process.env.NEXT_PUBLIC_SITE_URL_DEV,
  prod: process.env.NEXT_PUBLIC_SITE_URL_PROD,
  fallback: 'http://localhost:300',
});
