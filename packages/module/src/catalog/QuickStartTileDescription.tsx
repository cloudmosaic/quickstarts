import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Popover,
  Text,
  TextList,
  TextListItem,
  TextVariants,
} from '@patternfly/react-core';
import { InfoCircleIcon } from '@patternfly/react-icons';
import QuickStartMarkdownView from '../QuickStartMarkdownView';

import './QuickStartTileDescription.scss';

type QuickStartTileDescriptionProps = {
  description: string;
  prerequisites?: string[];
};
const QuickStartTileDescription: React.FC<QuickStartTileDescriptionProps> = ({
  description,
  prerequisites,
}) => {
  const { t } = useTranslation();
  const prereqs = prerequisites?.filter((p) => p);
  return (
    <>
      <div className="oc-quick-start-tile-description">
        <QuickStartMarkdownView content={description} />
      </div>
      {prereqs?.length > 0 && (
        <div className="co-quick-start-tile-prerequisites">
          <Text component={TextVariants.h5} className="co-quick-start-tile-prerequisites__text">
            {t('quickstart~Prerequisites ({{totalPrereqs}})', {
              totalPrereqs: prereqs.length,
            })}{' '}
          </Text>
          <Popover
            aria-label={t('quickstart~Prerequisites')}
            headerContent={t('quickstart~Prerequisites')}
            bodyContent={
              <TextList aria-label={t('quickstart~Prerequisites')}>
                {prereqs.map((prerequisite, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TextListItem key={index}><QuickStartMarkdownView content={prerequisite} /></TextListItem>
                ))}
              </TextList>
            }
          >
            <Button
              variant="link"
              isInline
              className="co-quick-start-tile-prerequisites__icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <InfoCircleIcon />
            </Button>
          </Popover>
        </div>
      )}
    </>
  );
};
export default QuickStartTileDescription;
