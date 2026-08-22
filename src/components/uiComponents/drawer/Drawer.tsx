import React, { type ReactNode } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { X } from 'lucide-react';

type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  anchor?: DrawerAnchor;
  width?: string | number;
  height?: string | number;
  children: ReactNode;
}

const isVertical = (anchor: DrawerAnchor) => anchor === 'top' || anchor === 'bottom';

const closeButtonStyle = (anchor: DrawerAnchor): React.CSSProperties => {
  const base: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'var(--player-border)',
    border: '1px solid var(--player-border)',
    cursor: 'pointer',
    color: 'var(--player-text-primary)',
  };

  // position the close button centered on the opening edge
  if (anchor === 'left') return { ...base, right: -16, top: '50%', transform: 'translateY(-50%)' };
  if (anchor === 'right') return { ...base, left: -16, top: '50%', transform: 'translateY(-50%)' };
  if (anchor === 'top') return { ...base, bottom: -16, left: '50%', transform: 'translateX(-50%)' };
  if (anchor === 'bottom') return { ...base, top: -16, left: '50%', transform: 'translateX(-50%)' };
  return base;
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  showCloseButton = true,
  anchor = 'left',
  width = 320,
  height = 320,
  children,
}) => {
  const vertical = isVertical(anchor);

  return (
    <MuiDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            background: 'transparent',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--player-border)',
            borderRadius:
              anchor === 'left'
                ? '0 12px 12px 0'
                : anchor === 'right'
                  ? '12px 0 0 12px'
                  : anchor === 'top'
                    ? '0 0 12px 12px'
                    : '12px 12px 0 0',
            width: vertical ? '100%' : width,
            height: vertical ? height : '100%',
            overflow: 'visible',
            boxShadow: 'none',
          },
        },
      }}
      ModalProps={{ keepMounted: false }}
    >
      {/* close button centered on the opening edge */}
      {showCloseButton && (
        <button onClick={onClose} style={closeButtonStyle(anchor)} aria-label="Close drawer">
          <X size={16} />
        </button>
      )}

      {/* scrollable content area */}
      <div
        style={{
          height: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`::-webkit-scrollbar { display: none; }`}</style>
        {children}
      </div>
    </MuiDrawer>
  );
};
