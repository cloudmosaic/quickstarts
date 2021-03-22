import React from 'react';
import ReactDOM from 'react-dom';
import '@patternfly/react-core/dist/styles/base.css';
import drawerStyles from '@patternfly/react-styles/css/components/Drawer/drawer';
import { QuickStart } from './components/QuickStart';

console.log('chrome here!');
(window as any).quickstarts = {};

const pages = document.getElementsByClassName('pf-c-page');
const page = pages.length > 0 ? pages[0] : document.body;

function makeDiv(className: string | string[]) {
  const div = document.createElement('div');
  if (Array.isArray(className)) {
    div.className = className.join(' ');
  }
  else {
    div.className = className;
  }
  return div;
}
// Wrap everything in a patternfly page drawer 
const pageDrawer = makeDiv('pf-c-page__drawer');
const drawer = makeDiv([drawerStyles.drawer, drawerStyles.modifiers.inline, drawerStyles.modifiers.expanded]);
drawer.id = 'quickstartDrawer';
const drawerMain = makeDiv(drawerStyles.drawerMain);
const drawerContent = makeDiv(drawerStyles.drawerContent);
const drawerContentBody = makeDiv(drawerStyles.drawerBody);
const drawerPanel = makeDiv(drawerStyles.drawerPanel);

pageDrawer.append(drawer);
drawer.append(drawerMain);
drawerContent.append(drawerContentBody);
drawerMain.append(drawerContent, drawerPanel);
const toMove = document.getElementById('root');
if (toMove) {
  drawerContentBody.appendChild(toMove);
}
else {
  // Move everything since we don't know what JS on page does
  while (page.childNodes.length) {
    drawerContentBody.appendChild(page.childNodes[0]);
  }
}
page.append(pageDrawer);

ReactDOM.render(<QuickStart />, drawerPanel);

