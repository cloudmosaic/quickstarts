import * as React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import {
  DrawerPanelContent,
  DrawerPanelBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Title,
} from "@patternfly/react-core";
// import { AsyncComponent } from '@console/internal/components/utils';
import { useScrollShadows, Shadows } from "@console/shared";
import { QuickStart } from "./utils/quick-start-types";
import "./QuickStartPanelContent.scss";
// js: Remove AsyncComponent and import QuickStartController directly
import QuickStartController from "./QuickStartController";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "./utils/quick-start-context";
import { camelize } from "./utils/quick-start-utils";

type HandleClose = () => void;

type QuickStartPanelContentProps = {
  quickStarts: QuickStart[];
  activeQuickStartID: string;
  handleClose: HandleClose;
  appendTo?: HTMLElement | (() => HTMLElement);
};

const getElement = (appendTo: HTMLElement | (() => HTMLElement)) => {
  if (typeof appendTo === "function") {
    return appendTo();
  }
  return appendTo;
};

const QuickStartPanelContent: React.FC<QuickStartPanelContentProps> = ({
  quickStarts = [],
  handleClose,
  activeQuickStartID,
  appendTo,
}) => {
  const { t } = useTranslation();
  const [contentRef, setContentRef] = React.useState<HTMLDivElement>();
  const shadows = useScrollShadows(contentRef);
  const quickStart = quickStarts.find(
    (qs) => qs.metadata.name === activeQuickStartID
  );
  const { activeQuickStartState } = React.useContext<QuickStartContextValues>(
    QuickStartContext
  );
  const taskNumber = activeQuickStartState?.taskNumber;
  const nextQuickStarts: QuickStart[] = quickStarts.filter((qs: QuickStart) =>
    quickStart?.spec.nextQuickStart?.includes(qs.metadata.name)
  );

  const headerClasses = classNames({
    "pf-u-box-shadow-sm-bottom":
      shadows === Shadows.top || shadows === Shadows.both,
  });

  const footerClass = classNames({
    "pf-u-box-shadow-sm-top":
      shadows === Shadows.bottom || shadows === Shadows.both,
  });

  const getStep = () => {
    const tasks = quickStart.spec.tasks.length;
    if (Number.parseInt(taskNumber as string) === -1) {
      return 'intro';
    } else if (Number.parseInt(taskNumber as string) === tasks) {
      return 'conclusion'
    }
    return Number.parseInt(taskNumber as string) + 1;
  }

  const content = quickStart ? (
    <DrawerPanelContent
      isResizable
      className="co-quick-start-panel-content"
      data-testid={`qs-drawer-${camelize(quickStart.spec.displayName)}`}
      data-qs={`qs-step-${getStep()}`}
    >
      <div className={`co-quick-start-panel-content-head ${headerClasses}`}>
        <DrawerHead>
          <div className="co-quick-start-panel-content__title">
            <Title
              headingLevel="h1"
              size="xl"
              style={{ marginRight: "var(--pf-global--spacer--md)" }}
            >
              {quickStart?.spec.displayName}{" "}
              <small className="co-quick-start-panel-content__duration text-secondary">
                {t("quickstart~{{duration, number}} minutes", {
                  duration: quickStart?.spec.durationMinutes,
                })}
              </small>
            </Title>
          </div>
          <DrawerActions>
            <DrawerCloseButton
              onClick={handleClose}
              data-testid="qs-drawer-close"
            />
          </DrawerActions>
        </DrawerHead>
      </div>
      <DrawerPanelBody
        hasNoPadding
        className="co-quick-start-panel-content__body"
      >
        {/* <AsyncComponent
          loader={() => import('./QuickStartController').then((c) => c.default)}
          quickStart={quickStart}
        /> */}
        <QuickStartController
          quickStart={quickStart}
          nextQuickStarts={nextQuickStarts}
          footerClass={footerClass}
          contentRef={setContentRef}
        />
      </DrawerPanelBody>
    </DrawerPanelContent>
  ) : null;

  if (appendTo) {
    return ReactDOM.createPortal(content, getElement(appendTo));
  }
  return content;
};

export default QuickStartPanelContent;
