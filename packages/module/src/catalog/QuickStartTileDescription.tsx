import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextVariants } from '@patternfly/react-core';
import QuickStartMarkdownView from '../QuickStartMarkdownView';

import './QuickStartTileDescription.scss';

type QuickStartTileDescriptionProps = {
  description: string;
  prerequisites?: string[];
  unmetPrerequisite?: boolean;
};
const QuickStartTileDescription: React.FC<QuickStartTileDescriptionProps> = ({
  description,
  prerequisites,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="oc-quick-start-tile-description">
        <QuickStartMarkdownView content={description} />
      </div>
      <div className="co-quick-start-tile-description">
        {prerequisites && (
          <>
            <Text component={TextVariants.h5}>{t('quickstart~Prerequisites')}</Text>
            {prerequisites.map((prerequisite, idx) => (
              <div key={`${idx} - ${prerequisite}`}>
                <Text component={TextVariants.small}>
                  <QuickStartMarkdownView content={prerequisite} />
                </Text>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default QuickStartTileDescription;
