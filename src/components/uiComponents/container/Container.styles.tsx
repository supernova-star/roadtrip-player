import { colorPalette } from '@/theme/colors';
import { getSpacing } from '@/theme/spacing';
import styled from 'styled-components';
import type {
  Cursor,
  FlexDirections,
  JustifyContent,
  StyledContainerProps,
  Wrap,
} from './Container';

const directionMap: Record<FlexDirections, string> = {
  row: 'row',
  rowReverse: 'row-reverse',
  column: 'column',
  columnReverse: 'column-reverse',
};

const justifyContentMap: Record<JustifyContent, string> = {
  center: 'center',
  end: 'end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  start: 'start',
};

const wrapMap: Record<Wrap, string> = {
  wrap: 'wrap',
  nowrap: 'nowrap',
  wrapReverse: 'wrap-reverse',
};

const CursorMap: Record<Cursor, string> = {
  pointer: 'pointer',
  default: 'default',
  none: 'none',
  notAllowed: 'not-allowed',
};

export const StyledContainer = styled.div<StyledContainerProps>`
  padding: ${({ padding, theme: { spacing } }) => padding && getSpacing(padding, spacing)};
  margin: ${({ margin, theme: { spacing } }) => margin && getSpacing(margin, spacing)};
  height: ${({ height, theme: { spacing } }) =>
    typeof height === 'string' ? height : height && getSpacing(height, spacing)};
  width: ${({ width, theme: { spacing } }) =>
    typeof width === 'string' ? width : width && getSpacing(width, spacing)};
  max-width: ${({ maxWidth, theme: { spacing } }) =>
    typeof maxWidth === 'string' ? maxWidth : maxWidth && getSpacing(maxWidth, spacing)};
  min-width: ${({ minWidth, theme: { spacing } }) =>
    typeof minWidth === 'string' ? minWidth : minWidth && getSpacing(minWidth, spacing)};
  max-height: ${({ maxHeight, theme: { spacing } }) =>
    typeof maxHeight === 'string' ? maxHeight : maxHeight && getSpacing(maxHeight, spacing)};
  min-height: ${({ minHeight, theme: { spacing } }) =>
    typeof minHeight === 'string' ? minHeight : minHeight && getSpacing(minHeight, spacing)};
  display: ${({ display }) => display && display};
  flex-direction: ${({ flexDirection }) => directionMap[flexDirection || 'row']};
  gap: ${({ gap, theme: { spacing } }) => gap && getSpacing(gap, spacing)};
  justify-content: ${({ justifyContent }) => justifyContentMap[justifyContent || 'start']};
  align-items: ${({ alignItems }) => alignItems && alignItems};
  flex-wrap: ${({ flexWrap }) => wrapMap[flexWrap || 'nowrap']};

  background: ${({ backgroundColor }) =>
    backgroundColor &&
    (colorPalette[backgroundColor as keyof typeof colorPalette] || backgroundColor)};
  border-color: ${({ borderColor }) => borderColor && colorPalette[borderColor]};
  position: ${({ position }) => (position ? position : 'static')};
  top: ${({ top }) => top && top};
  left: ${({ left }) => left && left};
  right: ${({ right }) => right && right};
  bottom: ${({ bottom }) => bottom && bottom};
  overflow: ${({ overflow }) => overflow && 'auto'};
  cursor: ${({ cursor }) => cursor && CursorMap[cursor]};
  opacity: ${({ opacity }) => opacity && opacity};
  text-align: ${({ textAlign }) => textAlign && textAlign};
  align-content: ${({ alignContent }) => alignContent && alignContent};
  align-self: ${({ alignSelf }) => alignSelf && alignSelf};
  border-radius: ${({ borderRadius, theme: { spacing } }) => borderRadius && getSpacing(borderRadius, spacing)};
  flex: ${({ flex }) => flex && flex};
  box-shadow: ${({ shadow }) => shadow && colorPalette.cardShadow};
  border: ${({ hasBorder, borderColor }) =>
    hasBorder ? `1px solid ${colorPalette[borderColor || 'borderGray']}` : 'none'};
  ${({ hideScrollbar }) =>
    hideScrollbar &&
    `
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  `}
  ${({ sx }) => sx};
`;
