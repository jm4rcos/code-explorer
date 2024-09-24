import { cn } from "../../lib/utils";

interface Props {
  className?: string;
  color?: string;
}

export const Separator = ({ className, color = "border-t-border" }: Props) => (
  <div className={cn("h-[1px] my-4 w-full border", className, color)} />
);
