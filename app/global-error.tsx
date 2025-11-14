"use client";

import { logError } from "@lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  logError("global-error", error, {
    digest: error.digest,
  });

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong!
            </h2>
            <p className="text-gray-600 mb-4">Error: {error.message}</p>
            <button
              onClick={() => reset()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reload page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

