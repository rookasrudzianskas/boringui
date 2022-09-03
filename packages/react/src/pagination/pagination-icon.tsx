import React from "react";

import {CSS} from "../theme/stitches.config";

import PaginationItem from "./pagination-item";
import {StyledPaginationIcon} from "./pagination.styles";

interface Props {
  isPrev?: boolean;
  disabled?: boolean;
  onlyDots?: boolean;
  animated?: boolean;
  bordered?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

type NativeAttrs = Omit<React.SVGAttributes<unknown>, keyof Props>;

export type PaginationIconProps = Props & NativeAttrs & {css?: CSS};

const PaginationIcon: React.FC<PaginationIconProps> = ({
  isPrev,
  disabled,
  onlyDots,
  animated,
  bordered,
  onClick,
  ...props
}) => {
  return (
    <PaginationItem
      preserveContent
      animated={animated}
      bordered={bordered}
      disabled={disabled}
      onlyDots={onlyDots}
      value={isPrev ? "<" : ">"}
      onClick={(e) => onClick && onClick(e)}
    >
      <StyledPaginationIcon
        className="nextui-pagination-icon"
        fill="none"
        focusable="false"
        isPrev={isPrev}
        role="presentation"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M15.5 19l-7-7 7-7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </StyledPaginationIcon>
    </PaginationItem>
  );
};

PaginationIcon.toString = () => ".nextui-pagination-icon";

const MemoPaginationIcon = React.memo(PaginationIcon);

export default MemoPaginationIcon;
