import React, { lazy, Suspense } from 'react';
import ErrorBoundary from 'shared/App/ErrorBoundary';
import ProgressBar from 'react-topbar-progress-indicator';

const loadable = (importFunc, fallback = <ProgressBar />) => {
  const LazyComponent = lazy(importFunc);
  return (props) => {
    return (
      <ErrorBoundary>
        <Suspense fallback={fallback}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
};

export default loadable;
