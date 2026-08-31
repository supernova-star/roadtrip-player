import React, { useEffect, useState } from 'react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { AdminHeader } from './AdminHeader';
import { User, getUsers } from '@/hooks/activeUsers';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Button } from '@/components/uiComponents/button/Button';
import { formatLastSeen } from '../utils/formatter';

type AdminShellProps = {
  onGoHome: () => void;
};

export const AdminShell = ({ onGoHome }: AdminShellProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadUsers = async () => {
    setIsRefreshing(true);

    try {
      const data = await getUsers();
      setUsers(data);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const onlineThreshold = 2 * 60 * 1000;

  const onlineUsers = users.filter(
    (user) =>
      user.last_seen_at &&
      Date.now() - new Date(user.last_seen_at).getTime() < onlineThreshold,
  );

  return (
    <ColumnFlexContainer
      height="100dvh"
      flex={1}
      backgroundColor="adminBackground"
      sx={{ color: 'adminDarkBrown', overflow: 'hidden' }}
    >
      <ColumnFlexContainer
        maxWidth="760px"
        height="100dvh"
        flex={1}
        backgroundColor="adminSurface"
        sx={{ mx: 'auto', minHeight: 0 }}
      >
        <AdminHeader onGoHome={onGoHome} />
        <ColumnFlexContainer
          padding={[0, 5, 22]}
          flex={1}
          data-testid="admin-shell-content"
          sx={{
            minHeight: 0,
            overflow: 'hidden',
            pb: 12,
            '@media (min-width: 600px)': { px: 4 },
          }}
        >
          <RowFlexContainer justifyContent="between">
            <Typography color="adminDarkBrown" variant="h4">
              Active now
            </Typography>

            <Button
              text={isRefreshing ? 'Refreshing...' : 'Refresh'}
              onClick={loadUsers}
              disabled={isRefreshing}
            />
          </RowFlexContainer>
          <Typography color="adminDarkBrown">
            {onlineUsers.length}{' '}
            {onlineUsers.length === 1 ? 'person' : 'people'} online ·{' '}
            {users.length} {users.length === 1 ? 'user' : 'users'} total
          </Typography>

          {users.length === 0 ? (
            <Typography color="adminDarkBrown">No users yet.</Typography>
          ) : (
            users.map((user) => {
              const isOnline =
                user.last_seen_at &&
                Date.now() - new Date(user.last_seen_at).getTime() <
                  2 * 60 * 1000;

              return (
                <RowFlexContainer
                  key={user.browser_id}
                  alignItems="center"
                  justifyContent="between"
                >
                  <Typography color="adminDarkBrown">
                    {isOnline ? '🟢' : '⚪'} {user.user_name}
                  </Typography>

                  <Typography color="adminDarkBrown">
                    {isOnline
                      ? 'Online'
                      : user.last_seen_at
                        ? `Last seen ${formatLastSeen(user.last_seen_at)}`
                        : 'Never seen'}
                  </Typography>
                </RowFlexContainer>
              );
            })
          )}
        </ColumnFlexContainer>
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
