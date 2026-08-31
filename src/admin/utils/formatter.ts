export const formatLastSeen = (lastSeenAt: string | null) => {
  if (!lastSeenAt) {
    return 'Never seen';
  }

  const lastSeen = new Date(lastSeenAt);
  const diffMs = Date.now() - lastSeen.getTime();
  const diffMinutes = Math.floor(diffMs / (60 * 1000));

  if (diffMinutes < 1) {
    return 'Just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} hr ago`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays === 1) {
    return 'Yesterday';
  }

  return `${diffDays} days ago`;
};
