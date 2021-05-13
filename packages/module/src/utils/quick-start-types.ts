// import { AccessReviewResourceAttributes } from '@console/internal/module/k8s/types';
import { AccessReviewResourceAttributes } from '../ConsoleInternal/module/k8s/types';

export type QuickStart = {
  apiVersion?: string;
  kind?: string;
  metadata: {
    name: string;
  };
  spec: QuickStartSpec;
};

export type QuickStartSpec = {
  version?: number;
  displayName: string;
  durationMinutes?: number;
  icon: string;
  description: string;
  prerequisites?: string[];
  introduction?: string;
  tasks?: QuickStartTask[];
  conclusion?: string;
  nextQuickStart?: string[];
  accessReviewResources?: AccessReviewResourceAttributes[];
  link?: QuickStartExternal;
  type?: QuickStartType;
};

export type QuickStartTask = {
  title?: string;
  description?: string;
  review?: QuickStartTaskReview;
  summary?: QuickStartTaskSummary;
};

export type QuickStartTaskReview = {
  instructions?: string;
  failedTaskHelp?: string;
};

export type QuickStartTaskSummary = {
  success?: string;
  failed?: string;
};

export type AllQuickStartStates = Record<string, QuickStartState>;

export type QuickStartState = Record<string, string | number | QuickStartStatus>;

export enum QuickStartStatus {
  COMPLETE = 'Complete',
  IN_PROGRESS = 'In Progress',
  NOT_STARTED = 'Not started',
}

export enum QuickStartTaskStatus {
  INIT = 'Initial',
  REVIEW = 'Review',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

export type QuickStartExternal = {
  href: string;
  text?: string;
};

export type QuickStartType = {
  text: string;
  color?: 'blue' | 'cyan' | 'green' | 'orange' | 'purple' | 'red' | 'grey';
};
