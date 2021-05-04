import { QuickStart, QuickStartStatus, AllQuickStartStates } from './quick-start-types';

export const getQuickStartByName = (name: string, quickStarts: QuickStart[]): QuickStart =>
  quickStarts.find((quickStart) => quickStart.metadata.name === name);

export const getQuickStartStatus = (
  allQuickStartStates: AllQuickStartStates,
  quickStartID: string,
): QuickStartStatus =>
  (allQuickStartStates?.[quickStartID]?.status as QuickStartStatus) ?? QuickStartStatus.NOT_STARTED;

export const getQuickStartStatusCount = (
  allQuickStartStates: AllQuickStartStates,
  quickStarts: QuickStart[],
): Record<QuickStartStatus, number> => {
  return quickStarts.reduce(
    (totals, item) => {
      totals[getQuickStartStatus(allQuickStartStates, item.metadata.name)]++;
      return totals;
    },
    {
      [QuickStartStatus.IN_PROGRESS]: 0,
      [QuickStartStatus.COMPLETE]: 0,
      [QuickStartStatus.NOT_STARTED]: 0,
    },
  );
};

export const filterQuickStarts = (
  quickStarts: QuickStart[],
  filterText: string,
  statusFilters: string[],
  allQuickStartStates: AllQuickStartStates,
): QuickStart[] => {
  const searchText = filterText.toLowerCase();
  return quickStarts.filter(
    ({ metadata: { name }, spec: { displayName, prerequisites = [], description } }) => {
      const matchesFilter =
        statusFilters.length > 0
          ? statusFilters.includes(getQuickStartStatus(allQuickStartStates, name))
          : true;
      const matchesText =
        displayName.toLowerCase().includes(searchText) ||
        description.toLowerCase().includes(searchText) ||
        prerequisites.some((text) => text.toLowerCase().includes(searchText));

      return matchesFilter && matchesText;
    },
  );
};

export const camelize = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}