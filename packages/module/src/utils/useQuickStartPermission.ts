// import { useAccessReview2 } from '@console/internal/components/utils';
// import { QuickStart } from './quick-start-types';

// const useQuickStartPermission = (quickStart: QuickStart): [boolean, boolean] => {
//   const {
//     spec: { accessReviewResources },
//   } = quickStart;

//   const accessReviews = [];
//   const accessReviewsLoading = [];

//   if (accessReviewResources) {
//     accessReviewResources.forEach((descriptor) => {
//       // access review resources for a specific quick start is going to be static so the order will not change
//       // eslint-disable-next-line react-hooks/rules-of-hooks
//       const [review, loading] = useAccessReview2(descriptor);
//       accessReviews.push(review);
//       accessReviewsLoading.push(loading);
//     });
//   }

//   const hasAccess = !accessReviewResources || accessReviews.every((review) => review);

//   const loaded = accessReviewsLoading.every((loading) => !loading);

//   return [loaded && hasAccess, loaded];
// };

// export default useQuickStartPermission;

// js: replace
import { QuickStart } from './quick-start-types';

const useQuickStartPermission = (quickStart: QuickStart): [boolean, boolean] => {
  return [true, true];
};

export default useQuickStartPermission;
