import * as React from 'react';
import _compact from 'lodash-es/compact';
import _concat from 'lodash-es/concat';

type SecondaryStatusProps = {
  status?: string | string[];
  className?: string;
};

const SecondaryStatus: React.FC<SecondaryStatusProps> = ({ status, className }) => {
  const statusLabel = _compact(_concat([], status)).join(', ');
  const cssClassName = className || '';
  if (statusLabel) {
    return (
      <div>
        <small className={`${cssClassName} text-muted`}>{statusLabel}</small>
      </div>
    );
  }
  return null;
};

export default SecondaryStatus;
