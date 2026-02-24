import type { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 text-gray-100">
            <div className="max-w-md text-center">
                <h1 className="mb-4 text-4xl font-bold text-red-400">Something went wrong</h1>
                <p className="mb-6 text-gray-400">
                    An unexpected error occurred. Please try again.
                </p>
                <pre className="mb-6 overflow-auto rounded-lg bg-gray-900 p-4 text-left text-sm text-red-300">
                    {error instanceof Error ? error.message : String(error)}
                </pre>
                <button
                    onClick={resetErrorBoundary}
                    className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}

export default ErrorFallback;
