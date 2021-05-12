import React from "react";
import { Modal, ModalVariant, Button } from "@patternfly/react-core";

export const QuitModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: any; onConfirm: any; }) => (
  <Modal
    variant={ModalVariant.small}
    title="You've completed the quick start!"
    isOpen={isOpen}
    onClose={onClose}
    actions={[
      <Button key="confirm" variant="primary" onClick={onConfirm}>
        Confirm
      </Button>,
      <Button key="cancel" variant="link" onClick={onClose}>
        Cancel
      </Button>,
    ]}
  >
    You've completed the quick start. Would you like to return to the tutorial?
  </Modal>
);
