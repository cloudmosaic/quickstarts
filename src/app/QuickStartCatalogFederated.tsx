import {
  QuickStartContext,
  QuickStartContextValues
} from '@app/quickstarts/utils/quick-start-context';
import QuickStartDrawer from '@app/quickstarts/QuickStartDrawer';
import * as React from 'react';
import QuickStartCatalogPage from '@app/quickstarts/QuickStartCatalogPage';



const QuickStartCatalogFederated: React.FunctionComponent<QuickStartContextValues> = (props) => {
  return (
    <QuickStartContext.Provider value={props}>
      <QuickStartCatalogPage />
    </QuickStartContext.Provider>
  );
};

export default QuickStartCatalogFederated;
