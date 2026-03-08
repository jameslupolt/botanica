import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Avoid noisy logs in tests while keeping visibility in runtime.
    if (import.meta.env.MODE !== 'test') {
      // eslint-disable-next-line no-console
      console.error('Unhandled application error');
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-leaf-50 to-white flex items-center justify-center px-4">
          <div className="max-w-md rounded-2xl border border-petal-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-display font-bold text-bark-900">Something went wrong</h1>
            <p className="mt-2 text-bark-600">
              Please refresh the page. If this keeps happening, try again later.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
