import { useEffect, useState } from 'react';

export const useMobileHistoryView = <View extends string>(historyKey: string) => {
  const [activeView, setActiveView] = useState<View | null>(null);

  useEffect(() => {
    if (!activeView) return undefined;

    const handlePopState = () => {
      setActiveView(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeView]);

  const openView = (view: View) => {
    window.history.pushState({ [historyKey]: view }, '', window.location.href);
    setActiveView(view);
  };

  const closeView = () => {
    window.history.back();
  };

  return {
    activeView,
    openView,
    closeView,
    setActiveView,
  };
};
