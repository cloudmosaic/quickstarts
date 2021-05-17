import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@patternfly/react-core';
import { QuickStartStatus } from '../utils/quick-start-types';
import { QuickStartContext, QuickStartContextValues } from '../utils/quick-start-context';
import { camelize } from '../utils/quick-start-utils';

import './QuickStartFooter.scss';

export type QuickStartFooterProps = {
  status: QuickStartStatus;
  footerClass: string;
  taskNumber: number;
  totalTasks: number;
  onNext: () => void;
  onBack: () => void;
  quickStartId: string;
};

const QuickStartFooter: React.FC<QuickStartFooterProps> = ({
  status,
  taskNumber,
  totalTasks,
  onNext,
  onBack,
  footerClass,
  quickStartId,
}) => {
  const { t } = useTranslation();
  const { footer, restartQuickStart } = React.useContext<QuickStartContextValues>(
    QuickStartContext,
  );

  const showAllLink = footer?.showAllLink;
  const onShowAllLinkClick = footer?.onShowAllLinkClick;

  const PrimaryButtonText = React.useMemo(() => {
    return {
      START: t('quickstart~Start tour'),
      CONTINUE: t('quickstart~Continue'),
      NEXT: t('quickstart~Next'),
      CLOSE: t('quickstart~Close'),
    };
  }, [t]);

  const SecondaryButtonText = React.useMemo(() => {
    return {
      BACK: t('quickstart~Back'),
      RESTART: t('quickstart~Restart'),
    };
  }, [t]);

  const onRestart = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      restartQuickStart(quickStartId, totalTasks);
    },
    [quickStartId, restartQuickStart, totalTasks],
  );

  const getPrimaryButtonText = React.useMemo(() => {
    if (status === QuickStartStatus.NOT_STARTED) return PrimaryButtonText.START;

    if (taskNumber === totalTasks) return PrimaryButtonText.CLOSE;

    if (taskNumber > -1 && taskNumber < totalTasks) return PrimaryButtonText.NEXT;

    return PrimaryButtonText.CONTINUE;
  }, [taskNumber, totalTasks, PrimaryButtonText, status]);

  const getPrimaryButton = React.useMemo(
    () => (
      <Button variant="primary" className="co-quick-start-footer__actionbtn" onClick={onNext} data-testid={`qs-drawer-${camelize(getPrimaryButtonText)}`}>
        {getPrimaryButtonText}
      </Button>
    ),
    [getPrimaryButtonText, onNext],
  );

  const getSecondaryButton = React.useMemo(
    () =>
      taskNumber === -1 && status !== QuickStartStatus.NOT_STARTED ? (
        <Button variant="secondary" onClick={onRestart} data-testid="qs-drawer-restart">
          {SecondaryButtonText.RESTART}
        </Button>
      ) : (
        taskNumber > -1 && (
          <Button variant="secondary" onClick={onBack} data-testid="qs-drawer-back">
            {SecondaryButtonText.BACK}
          </Button>
        )
      ),
    [onRestart, onBack, SecondaryButtonText, status, taskNumber],
  );

  const getSideNoteAction = React.useMemo(
    () =>
      status === QuickStartStatus.COMPLETE &&
      taskNumber === totalTasks && (
        <Button variant="link" className="pull-right" onClick={onRestart} data-testid="qs-drawer-side-note-action">
          {SecondaryButtonText.RESTART}
        </Button>
      ),
    [status, SecondaryButtonText, onRestart, taskNumber, totalTasks],
  );

  return (
    <div className={`co-quick-start-footer ${footerClass}`}>
      {getPrimaryButton}
      {getSecondaryButton}
      {getSideNoteAction}
    </div>
  );
};

export default QuickStartFooter;
