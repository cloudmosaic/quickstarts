import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "../utils/quick-start-context";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStatePrimary,
  Gallery,
  GalleryItem,
  Title,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import {
  EmptyBox,
  LoadingBox,
  removeQueryArgument,
} from "@console/internal/components/utils";
import { QuickStart } from "../utils/quick-start-types";
import {
  getQuickStartStatus,
  getQuickStartStatusCount,
  filterQuickStarts,
} from "../utils/quick-start-utils";
import {
  QUICKSTART_SEARCH_FILTER_KEY,
  QUICKSTART_STATUS_FILTER_KEY,
} from "../utils/const";
import QuickStartTile from "./QuickStartTile";
import QuickStartCatalogFilter from "./QuickStartCatalogFilter";

import "./QuickStartCatalog.scss";

type QuickStartCatalogProps = {
  quickStarts: QuickStart[];
  showFilter?: boolean;
};

const QuickStartCatalog: React.FC<QuickStartCatalogProps> = ({
  quickStarts,
  showFilter,
}) => {
  const { t } = useTranslation();
  const {
    activeQuickStartID,
    allQuickStartStates,
    setActiveQuickStart,
  } = React.useContext<QuickStartContextValues>(QuickStartContext);
  const queryParams = new URLSearchParams(window.location.search);
  const searchQuery = queryParams.get(QUICKSTART_SEARCH_FILTER_KEY) || "";
  const statusFilters =
    queryParams.get(QUICKSTART_STATUS_FILTER_KEY)?.split(",") || [];

  const clearFilters = () => {
    removeQueryArgument(QUICKSTART_SEARCH_FILTER_KEY);
    removeQueryArgument(QUICKSTART_STATUS_FILTER_KEY);
  };

  const initialFilteredQuickStarts = showFilter
    ? filterQuickStarts(
        quickStarts,
        searchQuery,
        statusFilters,
        allQuickStartStates
      ).sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName))
    : quickStarts;
  const [filteredQuickStarts, setFilteredQuickStarts] = React.useState(
    initialFilteredQuickStarts
  );

  const onSearchInputChange = (searchValue, statusList) => {
    const result = filterQuickStarts(
      quickStarts,
      searchValue,
      statusList,
      allQuickStartStates
    ).sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName));
    setFilteredQuickStarts(result);
  };

  const onStatusChange = (searchValue, statusList) => {
    const result = filterQuickStarts(
      quickStarts,
      searchValue,
      statusList,
      allQuickStartStates
    ).sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName));
    setFilteredQuickStarts(result);
  };

  const quickStartStatusCount = React.useMemo(
    () => getQuickStartStatusCount(allQuickStartStates, quickStarts),
    [allQuickStartStates, quickStarts]
  );

  const emptyState = (
    <EmptyState>
      <EmptyStateIcon icon={SearchIcon} />
      <Title size="lg" headingLevel="h4">
        {t("quickstart~No results found")}
      </Title>
      <EmptyStateBody>
        {t(
          "quickstart~No results match the filter criteria. Remove filters or clear all filters to show results."
        )}
      </EmptyStateBody>
      <EmptyStatePrimary>
        <Button variant="link" onClick={clearFilters}>
          {t("quickstart~Clear all filters")}
        </Button>
      </EmptyStatePrimary>
    </EmptyState>
  );

  if (!quickStarts) return <LoadingBox />;
  return quickStarts.length === 0 ? (
    <EmptyBox label={t("quickstart~Quick Starts")} />
  ) : (
    <>
      {showFilter && (
        <QuickStartCatalogFilter
          quickStartsCount={filteredQuickStarts.length}
          quickStartStatusCount={quickStartStatusCount}
          onSearchInputChange={onSearchInputChange}
          onStatusChange={onStatusChange}
        />
      )}
      {filteredQuickStarts.length === 0 ? (
        emptyState
      ) : (
        <div className="ocs-page-layout__content is-dark">
          <Gallery className="co-quick-start-catalog__gallery" hasGutter>
            {filteredQuickStarts.map((quickStart) => {
              const {
                metadata: { name: id },
                spec: { tasks },
              } = quickStart;

              return (
                <GalleryItem key={id}>
                  <QuickStartTile
                    quickStart={quickStart}
                    isActive={id === activeQuickStartID}
                    status={getQuickStartStatus(allQuickStartStates, id)}
                    onClick={() => setActiveQuickStart(id, tasks?.length)}
                  />
                </GalleryItem>
              );
            })}
          </Gallery>
        </div>
      )}
    </>
  );
};

export default QuickStartCatalog;
