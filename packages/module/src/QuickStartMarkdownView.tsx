import * as React from "react";
import { extension } from "showdown";
import { SyncMarkdownView } from "@console/internal/components/markdown-view";
import { MarkdownHighlightExtension } from "@console/shared";
import { HIGHLIGHT_REGEXP } from "@console/shared/src/components/markdown-highlight-extension/highlight-consts";

export const EXTENSION_NAME = "quickstart";
extension(EXTENSION_NAME, () => {
  return [
    {
      type: "lang",
      regex: HIGHLIGHT_REGEXP,
      replace: (
        text: string,
        linkLabel: string,
        linkType: string,
        linkId: string
      ): string => {
        if (!linkLabel || !linkType || !linkId) return text;
        return `<button class="pf-c-button pf-m-inline pf-m-link" data-highlight="${linkId}">${linkLabel}</button>`;
      },
    },
  ];
});

/* TODO: Make this extension opt-in? */
extension("curlyAttrs", () => {
  return [
    {
      type: "output",
      filter: function (text, converter, options) {
        // check HTML for patterns like: <em>Status: unknown</em>{#extension-requirement-status}
        // and replace with <em id="extension-requirement-status">Status: unknown</em>
        return text.replace(/<em>(.*)<\/em>{#(.*)}/g, '<em id="$2">$1</em>');
      },
    },
  ];
});

export const removeParagraphWrap = (markdown: string) =>
  markdown.replace(/^<p>|<\/p>$/g, "");

type QuickStartMarkdownViewProps = {
  content: string;
  exactHeight?: boolean;
};

const QuickStartMarkdownView: React.FC<QuickStartMarkdownViewProps> = ({
  content,
  exactHeight,
}) => {
  return (
    <SyncMarkdownView
      inline
      content={content}
      exactHeight={exactHeight}
      extensions={[EXTENSION_NAME, "curlyAttrs"]}
      renderExtension={(docContext, rootSelector) => (
        <MarkdownHighlightExtension
          key={content}
          docContext={docContext}
          rootSelector={rootSelector}
        />
      )}
    />
  );
};
export default QuickStartMarkdownView;
