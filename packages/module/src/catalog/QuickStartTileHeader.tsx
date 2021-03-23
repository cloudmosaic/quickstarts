import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusIcon } from '@console/shared';
import { Label, Title } from '@patternfly/react-core';
import { OutlinedClockIcon } from '@patternfly/react-icons';
import { QuickStartStatus, QuickStartType } from '../utils/quick-start-types';
import './QuickStartTileHeader.scss';

type QuickStartTileHeaderProps = {
  status: string;
  duration: number;
  name: string;
  type?: QuickStartType;
};

const statusColorMap = {
  [QuickStartStatus.COMPLETE]: 'green',
  [QuickStartStatus.IN_PROGRESS]: 'purple',
  [QuickStartStatus.NOT_STARTED]: 'grey',
};

const QuickStartTileHeader: React.FC<QuickStartTileHeaderProps> = ({ status, duration, name, type }) => {
  const { t } = useTranslation();

  const statusLocaleMap = {
    [QuickStartStatus.COMPLETE]: t('quickstart~Complete'),
    [QuickStartStatus.IN_PROGRESS]: t('quickstart~In progress'),
    [QuickStartStatus.NOT_STARTED]: t('quickstart~Not started'),
  };

  return (
    <div className="co-quick-start-tile-header">
      <Title headingLevel="h3">{name}</Title>
      <div className="co-quick-start-tile-header__status">
        {type && (
          <Label className="co-quick-start-tile-header--margin" color={type.color}>
            {type.text}
          </Label>
        )}
        {status !== QuickStartStatus.NOT_STARTED && (
          <Label
            className="co-quick-start-tile-header--margin"
            variant="outline"
            color={statusColorMap[status]}
            icon={<StatusIcon status={status} />}
          >
            {statusLocaleMap[status]}
          </Label>
        )}
        {duration && <Label variant="outline" icon={<OutlinedClockIcon />}>
          {t('quickstart~{{duration, number}} minutes', { duration })}
        </Label>}
      </div>
    </div>
  );
};

export default QuickStartTileHeader;
