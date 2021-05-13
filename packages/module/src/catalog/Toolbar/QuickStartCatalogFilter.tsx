import * as React from 'react';
import { Toolbar, ToolbarProps, ToolbarContent } from '@patternfly/react-core';
import { QuickStartStatus } from '../../utils/quick-start-types';
import {
  QuickStartCatalogFilterSearchWrapper,
  QuickStartCatalogFilterCountWrapper,
  QuickStartCatalogFilterStatusWrapper,
} from './QuickStartCatalogFilterItems';

import './QuickStartCatalogFilter.scss';

interface QuickStartCatalogFilterProps extends Omit<ToolbarProps, 'ref'> {
  quickStartsCount: number;
  quickStartStatusCount: Record<QuickStartStatus, number>;
  onSearchInputChange: any;
  onStatusChange: any;
}

const QuickStartCatalogFilter: React.FC<QuickStartCatalogFilterProps> = ({
  quickStartsCount,
  quickStartStatusCount,
  onSearchInputChange = () => {},
  onStatusChange = () => {},
  ...props
}) => {
  return (
    <Toolbar usePageInsets {...props}>
      <ToolbarContent>
        <QuickStartCatalogFilterSearchWrapper onSearchInputChange={onSearchInputChange} />
        <QuickStartCatalogFilterStatusWrapper
          quickStartStatusCount={quickStartStatusCount}
          onStatusChange={onStatusChange}
        />
        <QuickStartCatalogFilterCountWrapper quickStartsCount={quickStartsCount} />
      </ToolbarContent>
    </Toolbar>
  );
};

export default QuickStartCatalogFilter;
