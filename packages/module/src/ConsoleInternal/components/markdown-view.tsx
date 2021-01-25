import * as React from "react";
import * as _ from "lodash-es";
import { Converter } from "showdown";
import DOMPurify from "dompurify";

const tableTags = ["table", "thead", "tbody", "tr", "th", "td"];

const markdownConvert = (markdown, extensions?: string[]) => {
  const unsafeHtml = new Converter({
    tables: true,
    openLinksInNewWindow: true,
    strikethrough: true,
    emoji: true,
    extensions,
  }).makeHtml(markdown);

  // add hook to transform anchor tags
  DOMPurify.addHook("beforeSanitizeElements", function (node) {
    // nodeType 1 = element type
    if (node.nodeType === 1 && node.nodeName.toLowerCase() === "a") {
      node.setAttribute("rel", "noopener noreferrer");
      return node;
    }
  });

  return DOMPurify.sanitize(unsafeHtml, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "strike",
      "s",
      "del",
      "em",
      "strong",
      "a",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "code",
      "pre",
      "button",
      ...tableTags,
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
};

type SyncMarkdownProps = {
  content: string;
  emptyMsg?: string;
  styles?: string;
  exactHeight?: boolean;
  truncateContent?: boolean;
  extensions?: string[];
  renderExtension?: (contentDocument: HTMLDocument) => React.ReactNode;
};

type State = {
  loaded?: boolean;
};

export class SyncMarkdownView extends React.Component<
  SyncMarkdownProps,
  State
> {
  private frame: any;
  private timeoutHandle: any;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  updateDimensions() {
    if (!this.frame?.contentWindow?.document.body.firstChild) {
      return;
    }
    this.frame.style.height = `${this.frame.contentWindow.document.body.firstChild.scrollHeight}px`;

    // Let the new height take effect, then reset again once we recompute
    this.timeoutHandle = setTimeout(() => {
      if (this.props.exactHeight) {
        this.frame.style.height = `${this.frame.contentWindow.document.body.firstChild.scrollHeight}px`;
      } else {
        // Increase by 15px for the case where a horizontal scrollbar might appear
        this.frame.style.height = `${
          this.frame.contentWindow.document.body.firstChild.scrollHeight + 15
        }px`;
      }
    });
  }

  onLoad() {
    this.updateDimensions();
    this.setState({ loaded: true });
  }

  render() {
    // Find the app's stylesheets and inject them into the frame to ensure consistent styling.
    // webpack: const extractCSS = new MiniCssExtractPlugin({ filename: 'app-bundle.[contenthash].css' });
    // https://console-openshift-console.apps.rhamilto.devcluster.openshift.com/static/181.app-bundle.5637763d43f192d1cef3.css
    const filteredLinks = Array.from(
      document.getElementsByTagName("link")
    ).filter((l) => _.includes(l.href, "app-bundle"));

    const linkRefs = _.reduce(
      filteredLinks,
      (refs, link) => `${refs}
        <link rel="stylesheet" href="${link.href}">`,
      ""
    );
    const content = this.props.truncateContent
      ? _.truncate(this.props.content, {
          length: 256,
          separator: " ",
          omission: "\u2026",
        })
      : this.props.content;

    const emptyMsg = this.props.emptyMsg;

    const contents = `
      ${linkRefs}
      <style type="text/css">
      body {
        background-color: transparent !important;
        color: ${content ? "#333" : "#999"};
        font-family: var(--pf-global--FontFamily--sans-serif);
        min-width: auto !important;
      }
      table {
        display: block;
        margin-bottom: 11.5px;
        overflow-x: auto;
      }
      td,
      th {
        border-bottom: 1px solid #ededed;
        padding: 10px;
        vertical-align: top;
      }
      th {
        padding-top: 0;
      }
      ${this.props.styles ? this.props.styles : ""}
      </style>
      <body class="pf-m-redhat-font"><div style="overflow-y: auto;">${markdownConvert(
        content || emptyMsg || "Not available",
        this.props.extensions
      )}</div></body>`;
    const hasExtension =
      this.props.extensions?.length > 0 && !!this.props.renderExtension;
    return (
      // <>
      //   <iframe
      //     sandbox="allow-popups allow-same-origin"
      //     srcDoc={contents}
      //     style={{ border: '0px', display: 'block', width: '100%', height: '0' }}
      //     ref={(r) => (this.frame = r)}
      //     onLoad={() => this.onLoad()}
      //   />
      //   {this.state?.loaded &&
      //     this.frame?.contentDocument &&
      //     hasExtension &&
      //     this.props.renderExtension(this.frame.contentDocument)}
      // </>
      <div
        dangerouslySetInnerHTML={{
          __html: markdownConvert(
            content || emptyMsg || "Not available",
            this.props.extensions
          ),
        }}
      />
    );
  }
}
