import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerContentBody,
} from "@patternfly/react-core";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "./utils/quick-start-context";
import { QuickStartStatus } from "./utils/quick-start-types";
import QuickStartPanelContent from "./QuickStartPanelContent";
import QuickStartCloseModal from "./QuickStartCloseModal";
import QuickStartsLoader from "./loader/QuickStartsLoader";
import { history } from "./ConsoleInternal/components/utils/router";
import { QUICKSTART_ID_FILTER_KEY } from "./utils/const";
import "./QuickStartDrawer.scss";

export const QuickStartDrawer: React.FC = ({ children }) => {
  const allContext = React.useContext<QuickStartContextValues>(
    QuickStartContext
  );
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quickStartId = params.get(QUICKSTART_ID_FILTER_KEY) || "";
    if (quickStartId && allContext.activeQuickStartID !== quickStartId) {
      allContext.setActiveQuickStart(quickStartId);
    }
  }, []);

  const {
    activeQuickStartID,
    activeQuickStartState,
    setActiveQuickStart,
  } = allContext;
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const activeQuickStartStatus = activeQuickStartState?.status;
  const onClose = () => setActiveQuickStart("");
  const handleClose = () => {
    if (activeQuickStartStatus === QuickStartStatus.IN_PROGRESS) {
      setModalOpen(true);
    } else {
      onClose();
    }
  };

  const onModalConfirm = () => {
    setModalOpen(false);
    onClose();
  };

  const onModalCancel = () => setModalOpen(false);

  const panelContent = (
    <QuickStartsLoader>
      {(quickStarts) => (
        <QuickStartPanelContent
          quickStarts={quickStarts}
          handleClose={handleClose}
          activeQuickStartID={activeQuickStartID}
        />
      )}
    </QuickStartsLoader>
  );

  return (
    <>
      <Drawer isExpanded={!!activeQuickStartID} isInline>
        <DrawerContent panelContent={panelContent}>
          <DrawerContentBody className="co-quick-start-drawer__body">
            {children}
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
      <QuickStartCloseModal
        isOpen={modalOpen}
        onConfirm={onModalConfirm}
        onCancel={onModalCancel}
      />
    </>
  );
};
