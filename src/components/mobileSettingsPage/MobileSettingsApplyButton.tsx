import React from 'react';
import { MousePointerClick } from 'lucide-react';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

type MobileSettingsApplyButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export const MobileSettingsApplyButton: React.FC<MobileSettingsApplyButtonProps> = ({
  disabled,
  onClick,
}) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="center"
    gap={[2]}
    padding={[3]}
    cursor={disabled ? 'notAllowed' : 'pointer'}
    onClick={disabled ? undefined : onClick}
    style={{
      borderRadius: '10px',
      backgroundColor: 'var(--player-accent)',
      border: '1px solid var(--player-accent)',
      opacity: disabled ? 0.55 : 1,
      flexShrink: 0,
    }}
  >
    <MousePointerClick size="16px" color="var(--player-background)" />
    <Typography variant="body2" weight="semiBold" color="var(--player-background)">
      Apply Settings
    </Typography>
  </RowFlexContainer>
);
