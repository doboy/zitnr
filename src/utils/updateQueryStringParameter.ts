export const updateQueryStringParameter = (key: string, val: string) => {
  const uri = new URL(window.location.href);
  uri.searchParams.set(key, val);
  window.history.replaceState({}, "Zitnr", uri.href);
};
