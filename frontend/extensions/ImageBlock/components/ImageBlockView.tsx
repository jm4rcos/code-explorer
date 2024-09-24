import { cn } from "@/lib/utils";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef } from "react";

interface ImageBlockAttrs {
  src: string;
  align?: "left" | "center" | "right";
  width?: string;
}

export const ImageBlockView = (props: NodeViewProps) => {
  const { editor, getPos, node } = props;
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const attrs = node.attrs as ImageBlockAttrs;
  const { src, align = "center", width = "100%" } = attrs;

  const wrapperClassName = cn(
    align === "left" ? "ml-0" : "ml-auto",
    align === "right" ? "mr-0" : "mr-auto",
    align === "center" && "mx-auto"
  );

  const onClick = useCallback(() => {
    if (typeof getPos === "function") {
      editor.commands.setNodeSelection(getPos());
    }
  }, [getPos, editor.commands]);

  return (
    <NodeViewWrapper>
      <div className={wrapperClassName} style={{ width }}>
        <div contentEditable={false} ref={imageWrapperRef}>
          <img className="block" src={src} alt="" onClick={onClick} />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default ImageBlockView;
