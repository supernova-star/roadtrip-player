import * as React from 'react';
import MuiModal, { type ModalProps as MuiModalProps } from '@mui/material/Modal';
import styled from 'styled-components';
import { X } from 'lucide-react';

// const ModalContent = styled.div{`
//   position: 'absolute';
//   top: '50%';
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   outline: 'none',
//   zIndex: 1,
//   background: 'red',
//   `}

// const CloseButton = styled('button')({
//   position: 'absolute',
//   top: 12,
//   right: 12,
//   width: 32,
//   height: 32,
//   border: 'none',
//   borderRadius: '50%',
//   background: 'var(--player-border)',
//   color: 'var(--player-text-primary)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   cursor: 'pointer',
//   zIndex: 1,
//   padding: 0,
//   '&:hover': {
//     filter: 'brightness(1.15)',
//   },
// });

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: var(--player-border);
  color: var(--player-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  padding: 0;

  &:hover {
    filter: brightness(1.15);
  }
`;

export type ModalProps = Omit<MuiModalProps, 'children'> & {
  children: React.ReactNode;
  contentStyle?: React.CSSProperties;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    children,
    contentStyle,
    showCloseButton = true,
    closeButtonLabel = 'Close modal',
    onClose,
    ...props
  },
  ref
) {
  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(event, 'escapeKeyDown');
  };

  return (
    <MuiModal {...props} onClose={onClose}>
      <ModalContent ref={ref} style={contentStyle} data-testid="IDIOT">
        {showCloseButton && (
          <CloseButton type="button" aria-label={closeButtonLabel} onClick={handleCloseClick}>
            <X size={16} />
          </CloseButton>
        )}
        {children}
      </ModalContent>
    </MuiModal>
  );
});

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  z-index: 1;
  background-color: transparent !important;
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);

  @media (max-width: 767px) {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    max-height: 100dvh;
    transform: none;
    border-radius: 0;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: none;
    background: var(--surface-panel-strong);

    > :not(button) {
      width: 100% !important;
      max-width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 0 !important;
    }
  }
`;
