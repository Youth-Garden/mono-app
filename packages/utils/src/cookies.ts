export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const setCookie = (
  name: string,
  value: string,
  days?: number,
  path: string = '/'
) => {
  if (typeof document === 'undefined') {
    return;
  }
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=${path}`;
};

export const removeCookie = (name: string, path: string = '/') => {
  if (typeof document === 'undefined') {
    return;
  }
  document.cookie = `${name}=; Max-Age=-99999999; path=${path}`;
};
