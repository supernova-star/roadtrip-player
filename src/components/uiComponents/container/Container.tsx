import React from 'react';
import type { Colors, Spacing } from '@/theme/themeTypes';
import type { CSSProperties, MouseEventHandler } from 'react';
import { forwardRef, type FC } from 'react';
import type { CSSObject } from 'styled-components';
import { StyledContainer } from './Container.styles';

export type FlexDirections = 'row' | 'rowReverse' | 'column' | 'columnReverse';
export type JustifyContent = 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly';
export type Align = 'center' | 'start' | 'end' | 'stretch' | 'baseline';
export type Wrap = 'wrap' | 'nowrap' | 'wrapReverse';
export type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
export type Cursor = 'pointer' | 'default' | 'none' | 'notAllowed';
export type TextAlign = 'center' | 'left' | 'right' | 'justify';
export type OverFlow = 'hidden' | 'auto' | 'scroll' | 'visible';
export type Role =
  | 'button'
  | 'link'
  | 'menuitem'
  | 'listitem'
  | 'list'
  | 'listbox'
  | 'option'
  | 'presentation'
  | 'radio'
  | 'radiogroup'
  | 'separator'
  | 'tab'
  | 'tabpanel'
  | 'textbox'
  | 'tree'
  | 'treeitem';

export type StyledContainerProps = {
  padding?: Spacing;
  margin?: Spacing;
  width?: string | Spacing;
  height?: string | Spacing;
  maxWidth?: string | Spacing;
  minWidth?: string | Spacing;
  maxHeight?: string | Spacing;
  minHeight?: string | Spacing;
  display?: string;
  flexDirection?: FlexDirections;
  justifyContent?: JustifyContent;
  gap?: Spacing;
  alignItems?: Align;
  alignSelf?: Align;
  flexWrap?: Wrap;
  flex?: number;
  backgroundColor?: Colors | string;
  borderColor?: Colors;
  hasBorder?: boolean;
  position?: Position;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  overflow?: OverFlow;
  hideScrollbar?: boolean;
  cursor?: Cursor;
  opacity?: number;
  textAlign?: TextAlign;
  alignContent?: Align;
  borderRadius?: Spacing;
  shadow?: boolean;
  sx?: CSSObject;
};

export type ContainerProps = StyledContainerProps & {
  role?: Role;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
};

export const Container = forwardRef<HTMLDivElement, React.PropsWithChildren<ContainerProps>>(
  ({ children, ...props }, ref) => {
    return (
      <StyledContainer ref={ref} data-testid="container-wrapper" {...props}>
        {children}
      </StyledContainer>
    );
  }
);

export const RowFlexContainer = forwardRef<HTMLDivElement, React.PropsWithChildren<ContainerProps>>(
  ({ children, ...props }, ref) => (
    <Container ref={ref} display="flex" flexDirection="row" {...props}>
      {children}
    </Container>
  )
);

export const ColumnFlexContainer = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ContainerProps>
>(({ children, ...props }, ref) => (
  <Container ref={ref} display="flex" flexDirection="column" {...props}>
    {children}
  </Container>
));

export const Divider: FC<React.PropsWithChildren<StyledContainerProps>> = (props) => {
  return <Container height="1px" width="100%" backgroundColor="divider" {...props} />;
};
