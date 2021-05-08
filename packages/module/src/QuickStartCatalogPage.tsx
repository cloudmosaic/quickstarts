import * as React from "react";
import { useTranslation } from "react-i18next";
import QuickStartCatalog from "./catalog/QuickStartCatalog";
import { QuickStart } from "./utils/quick-start-types";
import {
  getQuickStartStatusCount,
  filterQuickStarts,
} from "./utils/quick-start-utils";
import {
  QUICKSTART_SEARCH_FILTER_KEY,
  QUICKSTART_STATUS_FILTER_KEY,
} from "./utils/const";
import {
  QuickStartContext,
  QuickStartContextValues,
} from "./utils/quick-start-context";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStatePrimary,
  Title,
  TextContent,
  Text,
  PageSection,
  PageSectionVariants,
  Divider,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import { removeQueryArgument } from "@console/internal/components/utils";
import QuickStartCatalogFilter from "./catalog/Toolbar/QuickStartCatalogFilter";

type QuickStartCatalogPageProps = {
  quickStarts: QuickStart[];
  showFilter?: boolean;
  sortFnc?: (q1: QuickStart, q2: QuickStart) => number;
  title?: string;
  showTitle?: boolean;
};

export const QuickStartCatalogEmptyState = ({ clearFilters }) => {
  const { t } = useTranslation();
  return (
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
};

export const QuickStartCatalogPage: React.FC<QuickStartCatalogPageProps> = ({
  quickStarts,
  showFilter,
  sortFnc = (q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName),
  title,
  showTitle = true
}) => {
  const { t } = useTranslation();
  const { allQuickStartStates } = React.useContext<QuickStartContextValues>(
    QuickStartContext
  );

  const initialQueryParams = new URLSearchParams(window.location.search);
  const initialSearchQuery =
    initialQueryParams.get(QUICKSTART_SEARCH_FILTER_KEY) || "";
  const [searchInputText, setSearchInputText] = React.useState<string>(
    initialSearchQuery
  );
  const initialStatusFilters =
    initialQueryParams.get(QUICKSTART_STATUS_FILTER_KEY)?.split(",") || [];
  const [statusFilters, setStatusFilters] = React.useState<string[]>(
    initialStatusFilters
  );

  const initialFilteredQuickStarts = showFilter
    ? filterQuickStarts(
        quickStarts,
        initialSearchQuery,
        initialStatusFilters,
        allQuickStartStates
      ).sort(sortFnc)
    : quickStarts;

  const [filteredQuickStarts, setFilteredQuickStarts] = React.useState(
    initialFilteredQuickStarts
  );
  React.useEffect(() => {
    const filteredQuickStarts = showFilter
      ? filterQuickStarts(
          quickStarts,
          searchInputText,
          statusFilters,
          allQuickStartStates
        ).sort(sortFnc)
      : quickStarts;
    setFilteredQuickStarts(filteredQuickStarts);
  }, [quickStarts]);

  const clearFilters = () => {
    removeQueryArgument(QUICKSTART_SEARCH_FILTER_KEY);
    removeQueryArgument(QUICKSTART_STATUS_FILTER_KEY);
    setFilteredQuickStarts(
      quickStarts.sort((q1, q2) =>
        q1.spec.displayName.localeCompare(q2.spec.displayName)
      )
    );
  };

  const onSearchInputChange = (searchValue) => {
    const result = filterQuickStarts(
      quickStarts,
      searchValue,
      statusFilters,
      allQuickStartStates
    ).sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName));
    setSearchInputText(searchValue);
    setFilteredQuickStarts(result);
  };

  const onStatusChange = (statusList) => {
    const result = filterQuickStarts(
      quickStarts,
      searchInputText,
      statusList,
      allQuickStartStates
    ).sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName));
    setStatusFilters(statusList);
    setFilteredQuickStarts(result);
  };

  const quickStartStatusCount = React.useMemo(
    () => getQuickStartStatusCount(allQuickStartStates, quickStarts),
    [allQuickStartStates, quickStarts]
  );

  return (
    <>
      {showTitle && <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">{title || t("quickstart~Quick Starts")}</Text>
        </TextContent>
      </PageSection>}
      {showTitle && <Divider component="div" />}
      {showFilter && (
        <>
          <PageSection
            padding={{
              default: "noPadding",
            }}
          >
            <QuickStartCatalogFilter
              quickStartsCount={filteredQuickStarts.length}
              quickStartStatusCount={quickStartStatusCount}
              onSearchInputChange={onSearchInputChange}
              onStatusChange={onStatusChange}
            />
          </PageSection>
          <Divider component="div" />
        </>
      )}
      <PageSection>
        {filteredQuickStarts.length === 0 ? (
          <QuickStartCatalogEmptyState clearFilters={clearFilters} />
        ) : (
          <QuickStartCatalog quickStarts={filteredQuickStarts} />
        )}
      </PageSection>
    </>
  );
};
