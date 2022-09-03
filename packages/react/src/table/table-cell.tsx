import React, {useRef, useImperativeHandle} from "react";
import {useTableCell} from "@react-aria/table";
import {GridNode} from "@react-types/grid";
import {TableState} from "@react-stately/table";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";

import {CSS} from "../theme/stitches.config";
import clsx from "../utils/clsx";

import {StyledTableCell} from "./table.styles";

type CellProps<T> = GridNode<T> & {rendered: React.ReactNode};

interface Props<T> {
  cell: CellProps<T>;
  state: TableState<T>;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<any>>;

export type TableCellProps<T = unknown> = Props<T> & NativeAttrs & {css?: CSS};

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({cell, state, ...props}, ref: React.Ref<HTMLTableCellElement | null>) => {
    const tableCellRef = useRef<HTMLTableCellElement | null>(null);

    useImperativeHandle(ref, () => tableCellRef?.current);

    const {
      gridCellProps,
    }: {
      gridCellProps: Omit<React.HTMLAttributes<unknown>, keyof TableCellProps<unknown>>;
    } = useTableCell({node: cell}, state, tableCellRef);

    const {isFocusVisible, focusProps} = useFocusRing();

    return (
      <StyledTableCell
        ref={tableCellRef}
        className={clsx("nextui-table-cell", props.className)}
        css={cell.props.css}
        isFocusVisible={isFocusVisible}
        {...mergeProps(gridCellProps, focusProps, props)}
      >
        {cell.rendered}
      </StyledTableCell>
    );
  },
);

TableCell.displayName = "NextUI.TableCell";

TableCell.toString = () => ".nextui-table-cell";

export default TableCell;
