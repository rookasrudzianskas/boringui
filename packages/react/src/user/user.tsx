import type {FocusRingAria} from "@react-aria/focus";

import {useFocusRing} from "@react-aria/focus";
import React, {ReactNode} from "react";
import {mergeProps} from "@react-aria/utils";

import {Avatar} from "../index";
import {NormalColors, NormalSizes} from "../utils/prop-types";
import {CSS} from "../theme/stitches.config";
import {ReactRef} from "../utils/refs";
import {useDOMRef} from "../utils/dom";
import {__DEV__} from "../utils/assertion";

import UserLink from "./user-link";
import {StyledUser, StyledUserInfo, StyledUserName, StyledUserDesc} from "./user.styles";

interface Props {
  name: ReactNode | string;
  children?: ReactNode;
  color?: NormalColors;
  size?: NormalSizes;
  src?: string;
  zoomed?: boolean;
  bordered?: boolean;
  pointer?: boolean;
  altText?: string;
  text?: string;
  description?: string;
  squared?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  size: "lg",
  squared: false,
  bordered: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type UserProps = Props & typeof defaultProps & NativeAttrs & {css?: CSS};

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof UserProps>;
}

const preClass = "nextui-user";

export const User = React.forwardRef((props: UserProps, ref: ReactRef<HTMLDivElement>) => {
  const {
    as,
    css,
    src,
    text,
    name,
    children,
    altText,
    color,
    squared,
    bordered,
    size,
    description,
    zoomed,
    pointer,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const {isFocusVisible, focusProps}: IFocusRingAria = useFocusRing();

  return (
    <StyledUser
      ref={domRef}
      as={as}
      {...mergeProps(otherProps, focusProps)}
      css={mergeProps(
        as === "button"
          ? {
              borderRadius: "$xs",
              // reset button styles
              background: "none",
              appearance: "none",
              p: 0,
              m: 0,
              outline: "none",
              border: "none",
              cursor: "pointer",
            }
          : {},
        css as any,
      )}
      isFocusVisible={isFocusVisible}
    >
      <Avatar
        alt={altText}
        bordered={bordered}
        className={`${preClass}-avatar`}
        color={color}
        pointer={pointer}
        size={size}
        squared={squared}
        src={src}
        text={text}
        zoomed={zoomed}
      />
      <StyledUserInfo className={`${preClass}-info`}>
        <StyledUserName className={`${preClass}-name`}>{name}</StyledUserName>
        <StyledUserDesc className={`${preClass}-desc`}>{description || children}</StyledUserDesc>
      </StyledUserInfo>
    </StyledUser>
  );
});

if (__DEV__) {
  User.displayName = "NextUI.User";
}

User.toString = () => ".nextui-user";

type UserComponent<P = {}> = React.NamedExoticComponent<P> & {
  Link: typeof UserLink;
};
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs & {css?: CSS};

export default User as UserComponent<ComponentProps>;
