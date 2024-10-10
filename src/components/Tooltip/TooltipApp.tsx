import { Tooltip, TooltipProps } from "@nextui-org/react";
import { ReactNode, useState } from "react";

interface Props extends TooltipProps {
  children: ReactNode;
}

export default function TooltipApp(props: Props) {
  const { children, content, placement = "bottom", ...prop } = props;

  const [isMobile] = useState(() => window.screen.width <= 768);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Tooltip
        content={content}
        placement={placement}
        onMouseLeave={() => {
          isMobile && setIsOpen(false);
        }}
        isOpen={isOpen}
        onOpenChange={(open) => !isMobile && setIsOpen(open)}
        {...prop}
      >
        <div onClick={() => isMobile && setIsOpen(!isOpen)}>{children}</div>
      </Tooltip>
    </>
  );
}
