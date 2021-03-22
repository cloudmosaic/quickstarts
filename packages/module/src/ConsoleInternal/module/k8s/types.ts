export type AccessReviewResourceAttributes = {
  group?: string;
  resource?: string;
  subresource?: string;
  verb?: K8sVerb;
  name?: string;
  namespace?: string;
};

export type K8sVerb =
  | 'create'
  | 'get'
  | 'list'
  | 'update'
  | 'patch'
  | 'delete'
  | 'deletecollection'
  | 'watch';