import React, { useCallback } from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";
import { CopyIcon } from "lucide-react";
import toast from "react-hot-toast";

interface CodeBlockComponentProps extends NodeViewProps {
  extension: any;
}

const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({
  node,
  getPos,
  editor,
  updateAttributes,
  extension,
}) => {
  const { language: defaultLanguage } = node.attrs;

  const copyNodeToClipboard = useCallback(() => {
    if (typeof getPos === "function") {
      const pos = getPos();
      const selectedNode = editor.state.doc.nodeAt(pos);
      if (selectedNode) {
        const codeContent = selectedNode.textContent;

        navigator.clipboard
          .writeText(codeContent)
          .then(() => {
            toast.success("Code copied successfully!");
          })
          .catch((error) => {
            console.error("Failed to copy code:", error);
            toast.error("Failed to copy code. Please try again.");
          });
      }
    }
  }, [editor, getPos]);

  return (
    <NodeViewWrapper className="relative rounded-lg overflow-hidden">
      <div className="cursor-default flex items-center justify-between absolute bg-background p-2 left-0 top-0 w-full h-12 rounded-t-md">
        <select
          contentEditable={false}
          defaultValue={defaultLanguage}
          onChange={(event) =>
            updateAttributes({ language: event.target.value })
          }
          className="border hover:border-secondary shadow-0 cursor-pointer bg-background text-title p-1.5 rounded-md text-sm"
        >
          <option value="null">auto</option>
          <option disabled>—</option>
          {extension.options.lowlight.listLanguages().map((lang: string) => (
            <option
              className="capitalize cursor-pointer hover:bg-[var(--secondary50)]"
              key={lang}
              value={lang}
            >
              {lang}
            </option>
          ))}
        </select>

        <CopyIcon
          onClick={copyNodeToClipboard}
          className="w-5 h-5 mr-2 text-text cursor-pointer"
        />
      </div>

      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
