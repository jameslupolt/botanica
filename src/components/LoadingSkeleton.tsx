interface LoadingSkeletonProps {
  variant?: 'page' | 'card' | 'inline';
}

export function LoadingSkeleton({ variant = 'page' }: LoadingSkeletonProps) {
  if (variant === 'inline') {
    return (
      <div role="status" aria-live="polite" className="h-4 w-32 rounded bg-bark-100 animate-pulse">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-bark-100 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <div className="h-5 w-3/4 rounded bg-bark-100 animate-pulse" />
          <div className="h-4 w-full rounded bg-bark-50 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-bark-50 animate-pulse" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // page variant (default)
  return (
    <div role="status" aria-live="polite" className="min-h-screen bg-gradient-to-b from-leaf-50 to-white flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-leaf-200 border-t-leaf-600 animate-spin" />
          <div className="space-y-3 w-full">
            <div className="h-5 w-2/3 mx-auto rounded bg-bark-100 animate-pulse" />
            <div className="h-4 w-1/2 mx-auto rounded bg-bark-50 animate-pulse" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
