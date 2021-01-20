import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import '../i18n/i18n';
import {
  QuickStartContext,
  useValuesForQuickStartContext
} from '@app/quickstarts/utils/quick-start-context';
import QuickStartDrawer from '@app/quickstarts/QuickStartDrawer';
import { useState } from 'react';


const App: React.FunctionComponent = () => {
  const [initialized, setInitialized] = React.useState(true);

  const [activeQuickStartID, setActiveQuickStartID] = useState<string>('');

  const valuesForQuickstartContext = useValuesForQuickStartContext(activeQuickStartID, setActiveQuickStartID);

  if (!initialized) return <div>Loading</div>;

  // TODO - index doing router is not desired.
  // Split to App.tsx etc.
  return (
    <Router>
      <React.Suspense fallback={<div>Loading</div>}>
      <AppLayout>
        <QuickStartContext.Provider value={valuesForQuickstartContext}>
          <QuickStartDrawer>
            <AppRoutes />
          </QuickStartDrawer>
        </QuickStartContext.Provider>
      </AppLayout>
      </React.Suspense>
    </Router>
  );
};
export default App;
