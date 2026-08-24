import React from 'react';
import {
  ColumnFlexContainer,
  Container,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import styled, { keyframes } from 'styled-components';
import { Disc3, Loader2 } from 'lucide-react';

const drift = keyframes`
  0%, 100% { transform: translateX(-8px); opacity: 0.45; }
  50% { transform: translateX(8px); opacity: 1; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Mark = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  margin-bottom: 28px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.accent};
  background: rgba(23, 19, 15, 0.42);
  box-shadow:
    0 0 0 12px rgba(188, 108, 56, 0.06),
    0 16px 42px rgba(0, 0, 0, 0.24);
  animation: ${drift} 3.2s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    inset: -7px;
    border: 1px solid rgba(216, 207, 191, 0.2);
    border-radius: 50%;
  }
`;

const Progress = styled.div`
  width: 42%;
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.accent};
  animation: ${drift} 1.8s ease-in-out infinite;
`;

const Spinner = styled(Loader2)`
  position: absolute;
  right: -4px;
  bottom: -3px;
  padding: 4px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background2};
  animation: ${spin} 1.1s linear infinite;
`;

export const AuthenticationLoading = () => {
  return (
    <ColumnFlexContainer minHeight="100%" aria-busy="true" aria-live="polite">
      <Container
        minHeight="100%"
        display="grid"
        flex={1}
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        padding={[8, 5]}
        backgroundColor="adminRadialBackground"
      >
        <ColumnFlexContainer
          width="min(100%, 440px)"
          alignItems="center"
          textAlign="center"
        >
          <Mark aria-hidden="true">
            <Disc3 size={38} strokeWidth={1.5} />
            <Spinner size={24} strokeWidth={2} />
          </Mark>
          <Typography
            variant="h4"
            weight="semiBold"
            textAlign="center"
            sx={{ margin: 0 }}
          >
            Authenticating
          </Typography>
          <Typography
            variant="body2"
            color="secondaryText"
            textAlign="center"
            sx={{ maxWidth: 360, margin: '10px 0 28px', lineHeight: 1.6 }}
          >
            Checking your access and loading your music library.
          </Typography>
          <Container
            width="min(100%, 260px)"
            height="3px"
            overflow="hidden"
            sx={{ background: 'rgba(216, 207, 191, 0.18)', borderRadius: 999 }}
            aria-hidden="true"
          >
            <Progress />
          </Container>
        </ColumnFlexContainer>
      </Container>
    </ColumnFlexContainer>
  );
};
