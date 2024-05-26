import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/shared/lib/utils";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    wrap: {
      noWrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    grow: {
      0: "flex-grow-0",
      1: "flex-grow",
    },
    shrink: {
      0: "flex-shrink-0",
      1: "flex-shrink",
    },
  },
  defaultVariants: {
    direction: "row",
    wrap: "noWrap",
    align: "stretch",
    justify: "start",
    grow: 0,
    shrink: 1,
  },
});

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  asChild?: boolean;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction,
      wrap,
      align,
      justify,
      grow,
      shrink,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(
          flexVariants({
            direction,
            wrap,
            align,
            justify,
            grow,
            shrink,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Flex.displayName = "Flex";

export { Flex, flexVariants };
