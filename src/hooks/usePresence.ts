import { useEffect } from 'react';
import { upsertUserPresence } from '../lib/userPresence';

export const usePresence = (userName: string | null) => {
  useEffect(() => {
    if (!userName) {
      return;
    }

    const updatePresence = async () => {
      await upsertUserPresence(userName);
    };

    // Register/update immediately
    updatePresence();

    // Keep the user marked as active
    const interval = window.setInterval(() => {
      updatePresence();
    }, 60_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [userName]);
};
