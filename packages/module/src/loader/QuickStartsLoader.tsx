import * as React from 'react';
// import { useK8sWatchResource } from '@console/internal/components/utils/k8s-watch-hook';
// import { referenceForModel } from '@console/internal/module/k8s/k8s';
import { QuickStart } from '../utils/quick-start-types';
// import { QuickStartModel } from '../../../models';
import QuickStartPermissionChecker from './QuickStartPermissionChecker';
import { QuickStartContext, QuickStartContextValues } from '../utils/quick-start-context';

type QuickStartsLoaderProps = {
  children: (quickStarts: QuickStart[], loaded: boolean) => React.ReactNode;
};

const QuickStartsLoader: React.FC<QuickStartsLoaderProps> = ({ children }) => {
  // const [quickStarts, quickStartsLoaded] = useK8sWatchResource<QuickStart[]>({
  //   kind: referenceForModel(QuickStartModel),
  //   isList: true,
  // });
  const { allQuickStarts } = React.useContext<QuickStartContextValues>(QuickStartContext);
  // const [quickStarts, quickStartsLoaded] = React.useState<QuickStart[]>(allQuickStarts);
  const [allowedQuickStarts, setAllowedQuickStarts] = React.useState<QuickStart[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(!(allQuickStarts.length > 0));
  const permissionChecks = React.useRef<{ [name: string]: boolean }>({});

  const handlePermissionCheck = React.useCallback(
    (quickStart, hasPermission) => {
      permissionChecks.current[quickStart.metadata.name] = hasPermission;
      // if (Object.keys(permissionChecks.current).length === allQuickStarts.length) {
      const filteredQuickStarts = allQuickStarts.filter(
        (quickstart) => permissionChecks.current[quickstart.metadata.name],
      );
      setAllowedQuickStarts(filteredQuickStarts);
      setLoaded(true);
      // }
    },
    [allQuickStarts],
  );

  return (
    <>
      {allQuickStarts.map((quickstart) => {
        return (
          <QuickStartPermissionChecker
            key={quickstart.metadata.name}
            quickStart={quickstart}
            onPermissionCheck={handlePermissionCheck}
          />
        );
      })}
      {children(allowedQuickStarts, loaded)}
    </>
  );
};

export default QuickStartsLoader;
