import React, { FC, useEffect, useRef, useState } from 'react';
import { Home } from 'lucide-react';
import { Input } from '@mui/material';
import { Button } from '../../components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  Container,
} from '../../components/uiComponents/container/Container';
import { Typography } from '../../components/uiComponents/typography/Typography';
import { useUserProfileStore } from '../../store/userProfileStore';
import { wallpaperUrl } from '../../utils/formatter';
import { upsertUserPresence } from '@/lib/userPresence';

type StartProps = {
  onButtonClick: () => void;
};

const redirectDelayMs = 3000;

export const Start: FC<StartProps> = ({ onButtonClick }) => {
  const { userName, setUserName, isAdmin, setIsAdmin } = useUserProfileStore(
    (state) => state,
  );
  const displayName = userName?.trim();
  const adminTapTimesRef = useRef<number[]>([]);

  const [user, setUser] = useState('');
  const enteredUserName = user.trim();
  const isUserNameEmpty = enteredUserName.length === 0;

  const handleLogoTap = () => {
    if (isAdmin) {
      return;
    }

    const now = Date.now();
    const recentTaps = adminTapTimesRef.current.filter(
      (timestamp) => now - timestamp <= redirectDelayMs,
    );
    const updatedTaps = [...recentTaps, now].slice(-5);

    adminTapTimesRef.current = updatedTaps;

    if (updatedTaps.length >= 5) {
      setIsAdmin(true);
      adminTapTimesRef.current = [];
    }
  };

  useEffect(() => {
    if (!displayName) {
      return undefined;
    }

    const redirectTimer = window.setTimeout(() => {
      onButtonClick();
    }, redirectDelayMs);

    return () => window.clearTimeout(redirectTimer);
  }, [displayName, onButtonClick]);

  const saveUserName = async () => {
    setUserName(enteredUserName);
    await upsertUserPresence(enteredUserName);
    onButtonClick();
  };

  return (
    <Container
      minHeight="100dvh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      sx={{
        padding: '24px',
        color: '#ffe5ca',
        backgroundImage: `linear-gradient(180deg, rgba(4, 12, 32, 0.18) 0%, rgba(37, 24, 55, 0.22) 46%, rgba(16, 11, 19, 0.45) 100%), url(${wallpaperUrl('casette-background')})`,
        backgroundPosition: '64% 58%',
        backgroundSize: 'cover',
        '@media (max-width: 767px)': {
          backgroundPosition: '62% 58%',
        },
      }}
    >
      <Container
        width="min(100%, 560px)"
        minHeight="min(760px, calc(100dvh - 48px))"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{
          padding: 'clamp(32px, 7vw, 72px) 20px',
          textShadow: '0 2px 22px rgba(8, 7, 14, 0.52)',
        }}
      >
        <Container
          onClick={handleLogoTap}
          aria-label="Casette logo admin trigger"
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleLogoTap();
            }
          }}
          sx={{
            filter: 'drop-shadow(0 12px 24px rgba(6, 7, 18, 0.34))',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <img
            src="/icons/casette-logo.svg"
            alt="Casette logo"
            width={126}
            height={126}
            style={{ display: 'block', pointerEvents: 'none' }}
          />
        </Container>
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
            fontSize: 'clamp(72px, 19vw, 126px)',
            fontWeight: 400,
            lineHeight: 0.86,
            letterSpacing: 0,
          }}
        >
          Casette
        </Typography>
        <Typography
          variant="subtitle2"
          textStyle="uppercase"
          weight="bold"
          sx={{
            margin: '12px 0 26px',
            color: 'rgba(255, 232, 206, 0.88)',
            fontSize: 'clamp(13px, 3vw, 17px)',
            letterSpacing: '0.38em',
          }}
        >
          Music for the road
        </Typography>
        <Container
          aria-hidden="true"
          width="116px"
          position="relative"
          sx={{
            height: '1px',
            marginBottom: '32px',
            background:
              'linear-gradient(90deg, transparent, rgba(255, 204, 161, 0.72), transparent)',
          }}
        >
          <Container
            width="7px"
            height="7px"
            position="absolute"
            left="50%"
            top="50%"
            backgroundColor="#ffb06f"
            sx={{
              transform: 'translate(-50%, -50%) rotate(45deg)',
            }}
          />
        </Container>
        {displayName ? (
          <>
            <ColumnFlexContainer gap={[3]}>
              <Typography
                variant="h6"
                weight="semiBold"
                sx={{
                  color: 'rgba(255, 222, 193, 0.82)',
                  lineHeight: 1,
                  textAlign: 'center',
                  letterSpacing: 2,
                }}
              >
                Welcome {displayName ? 'Back' : ''}!
              </Typography>
              <Typography
                variant="h4"
                weight="bold"
                sx={{
                  color: '#fff3e5',
                  lineHeight: 1,
                  textAlign: 'center',
                  letterSpacing: 1,
                }}
              >
                {displayName}
              </Typography>
            </ColumnFlexContainer>

            <Typography
              variant="body1"
              weight="semiBold"
              sx={{
                maxWidth: '360px',
                margin: '14px auto 22px',
                color: 'rgba(255, 222, 193, 0.82)',
                fontSize: 'clamp(17px, 4vw, 21px)',
                lineHeight: 1.35,
              }}
            >
              Your journey. Your music.
            </Typography>
            <Container
              width="min(100%, 240px)"
              height="6px"
              overflow="hidden"
              sx={{
                marginTop: 'clamp(84px, 16vh, 150px)',
                borderRadius: '999px',
                background: 'rgba(255, 238, 217, 0.28)',
                boxShadow: '0 0 22px rgba(255, 190, 119, 0.22)',
              }}
            >
              <Container
                height="100%"
                width="100%"
                backgroundColor="#ffbd79"
                sx={{
                  borderRadius: '999px',
                  transformOrigin: 'left center',
                  animation: `redirectProgress ${redirectDelayMs}ms ease-out forwards`,
                  background:
                    'linear-gradient(90deg, #ff9d53 0%, #ffd29a 100%)',
                  '@keyframes redirectProgress': {
                    '0%': { transform: 'scaleX(0)' },
                    '100%': { transform: 'scaleX(1)' },
                  },
                }}
              />
            </Container>
            <Typography
              variant="caption"
              weight="semiBold"
              sx={{
                marginTop: '10px',
                color: 'rgba(255, 232, 206, 0.76)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Taking you home
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              weight="bold"
              sx={{
                color: '#fff3e5',
                // fontFamily: "Georgia, 'Times New Roman', serif",
                // fontSize: 'clamp(36px, 9vw, 58px)',
                lineHeight: 1.05,
                letterSpacing: 0,
              }}
            >
              What should we call you?
            </Typography>
            <Typography
              variant="caption"
              weight="semiBold"
              textAlign="center"
              sx={{
                maxWidth: '360px',
                margin: '14px auto 22px',
                color: 'rgba(255, 222, 193, 0.82)',
                fontSize: 'clamp(17px, 4vw, 21px)',
                lineHeight: 1.35,
              }}
            >
              Add your name to make this roadtrip playlist feel like yours.
            </Typography>
            <Input
              value={user ?? ''}
              placeholder="Enter your name"
              inputProps={{ 'aria-label': 'Enter your name' }}
              onChange={(event) => {
                setUser(event.target.value);
              }}
              sx={{
                width: 'min(100%, 320px)',
                marginBottom: '22px',
                padding: '4px 18px',
                borderRadius: '999px',
                background: 'rgba(255, 238, 217, 0.86)',
                boxShadow: '0 14px 30px rgba(19, 13, 12, 0.22)',
                textShadow: 'none',
                '&::before, &::after': {
                  display: 'none',
                },
                '& input': {
                  color: '#241a14',
                  fontSize: '18px',
                  fontWeight: 700,
                  textAlign: 'center',
                  padding: '10px 0',
                },
                '& input::placeholder': {
                  color: 'rgba(36, 26, 20, 0.56)',
                  opacity: 1,
                },
              }}
            />
            <Button
              text="Start Listening"
              disabled={isUserNameEmpty}
              onClick={saveUserName}
              iconOptions={{ icon: Home, iconColor: '#241a14' }}
              size="large"
              textOptions={{ textColor: '#241a14', textWeight: 'bold' }}
              buttonStyles={{ bgColor: '#ffbd79' }}
              sx={{
                minWidth: '196px',
                marginTop: '28px',
                borderRadius: '18px',
                background: 'linear-gradient(180deg, #ffd09a 0%, #ffaf63 100%)',
                boxShadow: '0 14px 26px rgba(19, 13, 12, 0.24)',
                '&:hover': {
                  background:
                    'linear-gradient(180deg, #ffdaa8 0%, #ffb872 100%)',
                },
                '&.Mui-disabled': {
                  background: 'rgba(255, 238, 217, 0.34)',
                  color: 'rgba(36, 26, 20, 0.42)',
                  boxShadow: 'none',
                },
              }}
            />
          </>
        )}
      </Container>
    </Container>
  );
};
