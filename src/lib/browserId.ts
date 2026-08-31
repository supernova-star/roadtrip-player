const BROWSER_ID_KEY = 'casette-browser-id';

export const getBrowserId = (): string => {
  const existingBrowserId = localStorage.getItem(BROWSER_ID_KEY);

  if (existingBrowserId) {
    return existingBrowserId;
  }

  const browserId = crypto.randomUUID();

  localStorage.setItem(BROWSER_ID_KEY, browserId);

  return browserId;
};
