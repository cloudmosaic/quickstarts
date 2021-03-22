import React from 'react';
import { DrawerHead, DrawerActions, DrawerCloseButton } from '@patternfly/react-core';

export const QuickStart = () => {

  return (
    <DrawerHead>
      Drawer panel body
      <DrawerActions>
        <DrawerCloseButton onClick={() => document.getElementById('quickstartDrawer').classList.remove('pf-m-expanded')} />
      </DrawerActions>
    </DrawerHead>
  );
}
