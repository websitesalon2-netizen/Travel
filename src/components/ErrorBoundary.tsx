import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Kashmiré Voyages application:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-6 text-slate-800">
          <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-lg space-y-4 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 text-2xl font-bold">
              !
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">
              Application Notice
            </h1>
            <p className="text-sm text-slate-600">
              An unexpected error occurred while initializing the view.
            </p>
            {this.state.error && (
              <pre className="text-left bg-slate-900 text-rose-300 p-4 rounded-xl text-xs overflow-auto max-h-48 font-mono">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                } catch (e) {
                  // ignore
                }
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0f4332] hover:bg-[#14533e] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow"
            >
              Reset Cache & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
