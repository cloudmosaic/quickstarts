import * as React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  DrawerPanelContent,
  DrawerPanelBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Title,
} from '@patternfly/react-core';
// import { AsyncComponent } from '@console/internal/components/utils';
import { useScrollShadows, Shadows } from '@console/shared';
import { QuickStart } from './utils/quick-start-types';
import './QuickStartPanelContent.scss';
// js: Remove AsyncComponent and import QuickStartController directly
import QuickStartController from './QuickStartController';

type HandleClose = () => void;

type QuickStartPanelContentProps = {
  quickStarts: QuickStart[];
  activeQuickStartID: string;
  handleClose: HandleClose;
};

const QuickStartPanelContent: React.FC<QuickStartPanelContentProps> = ({
  quickStarts = [],
  handleClose,
  activeQuickStartID,
}) => {
  const { t } = useTranslation();
  const [contentRef, setContentRef] = React.useState<HTMLDivElement>();
  const shadows = useScrollShadows(contentRef);
  const quickStart = quickStarts.find((qs) => qs.metadata.name === activeQuickStartID);

  const headerClasses = classNames({
    'pf-u-box-shadow-sm-bottom': shadows === Shadows.top || shadows === Shadows.both,
  });

  const footerClass = classNames({
    'pf-u-box-shadow-sm-top': shadows === Shadows.bottom || shadows === Shadows.both,
  });

  return quickStart ? (
    <DrawerPanelContent className="co-quick-start-panel-content">
      <div className={`co-quick-start-panel-content-head ${headerClasses}`}>
        <DrawerHead>
          <div className="co-quick-start-panel-content__title">
            <Title
              headingLevel="h1"
              size="xl"
              style={{ marginRight: 'var(--pf-global--spacer--md)' }}
            >
              {quickStart?.spec.displayName}{' '}
              <small className="co-quick-start-panel-content__duration text-secondary">
                {t('quickstart~{{duration, number}} minutes', {
                  duration: quickStart?.spec.durationMinutes,
                })}
              </small>
            </Title>
          </div>
          <DrawerActions>
            <DrawerCloseButton onClick={handleClose} />
          </DrawerActions>
        </DrawerHead>
      </div>
      <DrawerPanelBody hasNoPadding className="co-quick-start-panel-content__body">
        {/* <AsyncComponent
          loader={() => import('./QuickStartController').then((c) => c.default)}
          quickStart={quickStart}
        /> */}
        <QuickStartController 
          quickStart={quickStart}
          footerClass={footerClass}
          contentRef={setContentRef}
        />
      </DrawerPanelBody>
    </DrawerPanelContent>
  ) : null;
};

export default QuickStartPanelContent;
