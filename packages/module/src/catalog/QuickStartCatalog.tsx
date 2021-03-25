import * as React from "react";
import { Gallery, GalleryItem } from "@patternfly/react-core";
import { QuickStart } from "../utils/quick-start-types";
import { getQuickStartStatus } from "../utils/quick-start-utils";
import QuickStartTile from "./QuickStartTile";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "../utils/quick-start-context";

import "./QuickStartCatalog.scss";

type QuickStartCatalogProps = {
  quickStarts: QuickStart[];
};

const QuickStartCatalog: React.FC<QuickStartCatalogProps> = ({
  quickStarts
}) => {
  const {
    activeQuickStartID,
    allQuickStartStates,
  } = React.useContext<QuickStartContextValues>(QuickStartContext);

  return (
    <Gallery /*className="co-quick-start-catalog__gallery"*/ hasGutter>
      {quickStarts.map((quickStart) => {
        const {
          metadata: { name: id },
        } = quickStart;

        return (
          <GalleryItem key={id}>
            <QuickStartTile
              quickStart={quickStart}
              isActive={id === activeQuickStartID}
              status={getQuickStartStatus(allQuickStartStates, id)}
            />
          </GalleryItem>
        );
      })}
    </Gallery>
  );
};

export default QuickStartCatalog;
