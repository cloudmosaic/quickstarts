import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@patternfly/react-core";
import { QuickStartStatus } from "../utils/quick-start-types";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "../utils/quick-start-context";

import "./QuickStartFooter.scss";

export type QuickStartFooterProps = {
  status: QuickStartStatus;
  footerClass: string;
  taskNumber: number;
  totalTasks: number;
  onNext: () => void;
  onBack: () => void;
};

const QuickStartFooter: React.FC<QuickStartFooterProps> = ({
  status,
  taskNumber,
  totalTasks,
  onNext,
  onBack,
  footerClass,
}) => {
  const { t } = useTranslation();
  const { footer } = React.useContext<QuickStartContextValues>(
    QuickStartContext
  );

  const showAllLink = footer?.showAllLink;
  const onShowAllLinkClick = footer?.onShowAllLinkClick;

  const PrimaryButtonText = {
    START: t("quickstart~Start tour"),
    NEXT: t("quickstart~Next"),
    CLOSE: t("quickstart~Close"),
  };

  const getPrimaryButtonText = React.useCallback((): string => {
    if (taskNumber === totalTasks) return PrimaryButtonText.CLOSE;

    if (taskNumber > -1 && taskNumber < totalTasks)
      return PrimaryButtonText.NEXT;

    return PrimaryButtonText.START;
  }, [
    PrimaryButtonText.CLOSE,
    PrimaryButtonText.NEXT,
    PrimaryButtonText.START,
    taskNumber,
    totalTasks,
  ]);

  return (
    <div className={`co-quick-start-footer ${footerClass}`}>
      <Button
        style={{
          marginRight: "var(--pf-global--spacer--md)",
        }}
        type="submit"
        variant="primary"
        onClick={onNext}
        isInline
      >
        {getPrimaryButtonText()}
      </Button>
      {taskNumber > -1 && (
        <Button
          style={{
            marginRight: "var(--pf-global--spacer--md)",
          }}
          type="submit"
          variant="secondary"
          onClick={onBack}
          isInline
        >
          {t("quickstart~Back")}
        </Button>
      )}
      {status === QuickStartStatus.COMPLETE &&
        showAllLink &&
        onShowAllLinkClick && (
          <Button variant="link" isInline onClick={onShowAllLinkClick}>
            {t("quickstart~View all tours")}
          </Button>
        )}
    </div>
  );
};

export default QuickStartFooter;
