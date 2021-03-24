import React from 'react';
import { DrawerContext } from '@patternfly/react-core';
import {
  QuickStartPanelContent,
  QuickStartContext,
  useValuesForQuickStartContext,
  useLocalStorage,
} from '@cloudmosaic/quickstarts';
import { allQuickStarts } from "@cloudmosaic/quickstarts-dev/src/quickstarts-data/quick-start-test-data";

export const QuickStartPanel = () => {
  const onClose = () => document.getElementById('quickstartDrawer').classList.remove('pf-m-expanded');

  const [activeQuickStartID, setActiveQuickStartID] = useLocalStorage(
    "quickstartId",
    ""
  );

  const [allQuickStartStates, setAllQuickStartStates] = useLocalStorage(
    "quickstarts",
    {}
  );

  const valuesForQuickstartContext = useValuesForQuickStartContext({
    allQuickStarts,
    activeQuickStartID,
    setActiveQuickStartID,
    allQuickStartStates,
    setAllQuickStartStates,
    footer: {
      showAllLink: false,
      onShowAllLinkClick: () => {}
    },
  });

  return (
    <DrawerContext.Provider value={{isStatic: true}}>
      <QuickStartContext.Provider value={valuesForQuickstartContext}>
        <QuickStartPanelContent quickStarts={allQuickStarts} activeQuickStartID="sample-adoc" handleClose={onClose} />
      </QuickStartContext.Provider>
    </DrawerContext.Provider>
  );
}

