import { QuickStart } from '../utils/quick-start-types';
import { allQuickStarts } from './data/quick-start-test-data';

export const getQuickStarts = (): QuickStart[] => allQuickStarts;

export const getQuickStartByName = (name: string): QuickStart | undefined =>
  allQuickStarts.find((quickStart) => quickStart.metadata.name === name);
