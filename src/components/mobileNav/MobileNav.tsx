import React, { useState } from 'react';
import { Home, Library, Settings, User, type LucideIcon } from 'lucide-react';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';

export type MobileNavItem = 'home' | 'library' | 'settings' | 'profile';

type NavEntry = {
  id: MobileNavItem;
  label: string;
  icon: LucideIcon;
};

const navEntries: NavEntry[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'profile', label: 'Profile', icon: User },
];

export type MobileNavProps = {
  active?: MobileNavItem;
  onChange?: (item: MobileNavItem) => void;
};

export const MobileNav: React.FC<MobileNavProps> = ({ active, onChange }) => {
  const [internalActive, setInternalActive] = useState<MobileNavItem>('home');
  const activeItem = active ?? internalActive;

  const handleSelect = (item: MobileNavItem) => {
    setInternalActive(item);
    onChange?.(item);
  };

  return (
    <RowFlexContainer
      justifyContent="between"
      alignItems="center"
      backgroundColor="var(--surface-panel-strong)"
      padding={[3, 5]}
      width="100%"
      style={{
        borderTop: '1px solid var(--player-border)',
        backdropFilter: 'blur(20px)',
        boxShadow: 'var(--surface-shadow)',
      }}
    >
      {navEntries.map(({ id, label, icon: Icon }) => {
        const isActive = activeItem === id;
        return (
          <RowFlexContainer
            key={id}
            role="tab"
            aria-label={label}
            flex={1}
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            padding={[2]}
            onClick={() => handleSelect(id)}
          >
            <Icon
              size="24px"
              strokeWidth={isActive ? 2.25 : 1.5}
              color="var(--player-text-primary)"
              style={{ opacity: isActive ? 1 : 0.5, transition: 'all 200ms ease' }}
            />
          </RowFlexContainer>
        );
      })}
    </RowFlexContainer>
  );
};
