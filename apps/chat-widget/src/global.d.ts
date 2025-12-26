interface Window {
  spectre: import('./types').SpectreAPI;
}

declare module '*.css?inline' {
  const content: string;
  export default content;
}
