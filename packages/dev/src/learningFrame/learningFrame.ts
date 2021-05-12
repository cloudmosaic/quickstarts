import React from "react";
import ReactDOM from "react-dom";
import VanillaChildren from "./components/VanillaChildren";
import { TutorialBreadcrumb } from "./components/Breadcrumb";

const tutorialHeaderHeight = 49;
var count = 0;
let tutorial: any;
let rootNode: Node;
let bodyCopy: Node;

function makeDiv(
  className: string | string[],
  styles?: { [key: string]: string | number }
) {
  const div = document.createElement("div");
  if (Array.isArray(className)) {
    div.className = className.join(" ");
  } else {
    div.className = className;
  }
  if (styles) {
    for (const property in styles) {
      // @ts-ignore
      div.style[property] = styles[property];
    }
  }
  return div;
}

function copyAttrs(src: HTMLElement, target: HTMLElement) {
  for (let name of src.getAttributeNames()) {
    let value = src.getAttribute(name);
    if (value && target.getAttributeNames().indexOf(name) >= 0) {
      // merge the values
      value = value.concat(` ${target.getAttribute(name)}`);
    }
    value && target.setAttribute(name, value);
    src.removeAttribute(name);
  }
}

function duplicateChildNodes(from: HTMLElement, to: HTMLElement) {
  var children = Array.from(from.childNodes);
  children.forEach(function (item) {
    // var cln = item.cloneNode(true);
    // to.appendChild(cln);
    // (item as HTMLElement).style.display = "none";
    (item as HTMLElement).remove();
  });
}

export function wrapBody(e: Event, hostPath: string, tutorialPath: string) {
  /*
   * Tutorial header
   */
  debugger;
  const tutorialHeader = makeDiv("tut-main");
  ReactDOM.render(
    React.createElement(TutorialBreadcrumb, {
      basename: hostPath,
      crumbs: tutorialPath?.split("/") || [],
    }),
    tutorialHeader
  );

  /*
   * Wrap document body so we can move it to the drawer content
   */
  const wrappedDocBody = makeDiv("tut-doc-body", {
    height: `calc(100vh - ${tutorialHeaderHeight}px - 10px)`,
  });
  while (document.body.firstChild) {
    wrappedDocBody.appendChild(document.body.firstChild);
  }
  copyAttrs(document.body, wrappedDocBody);

  document.body.append(tutorialHeader);

  const tutorialDrawer = makeDiv("tut-drawer");
  tutorialDrawer.append(wrappedDocBody);
  document.body.append(tutorialDrawer);
}
