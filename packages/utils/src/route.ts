type ParamConfig = {
  [key: string]: string | number;
};

type QueryParams = Record<string, string | number | undefined>;

/**
 * Replace dynamic parameters in a route path
 * @example
 * replaceRouteParams('/users/{id}/posts/{postId}', { id: 123, postId: 456 })
 * // returns '/users/123/posts/456'
 */
const replaceRouteParams = (path: string, params?: ParamConfig): string => {
  if (!params) return path;

  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`[${key}]`, value.toString()),
    path
  );
};

/**
 * Create URL with query parameters
 * @example
 * createUrlWithQuery('/users', { page: 1, limit: 10, search: 'john' })
 * // returns '/users?page=1&limit=10&search=john'
 */
const createUrlWithQuery = (
  path: string,
  queryParams?: QueryParams
): string => {
  if (!queryParams) return path;

  const params = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) params.append(key, value.toString());
  });

  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
};

/**
 * Create a complete URL with both path parameters and query parameters
 * @example
 * createUrl(
 *   '/users/{userId}/posts/{postId}',
 *   { userId: 123, postId: 456 },
 *   { sort: 'desc', filter: 'active' }
 * )
 * // returns '/users/123/posts/456?sort=desc&filter=active'
 */
export const routeConfig = (
  path: string,
  pathParams?: ParamConfig,
  queryParams?: QueryParams
): string => {
  const resolvedPath = replaceRouteParams(path, pathParams);
  return createUrlWithQuery(resolvedPath, queryParams);
};
