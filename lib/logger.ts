import * as Sentry from "@sentry/nextjs";

interface ErrorContext {
  [key: string]: any;
}

/**
 * Centralized error logging utility
 * Logs to console in all environments
 * Sends to Sentry only in production
 */
export function logError(
  context: string,
  error: unknown,
  metadata?: ErrorContext
): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  const errorDetails = {
    timestamp: new Date().toISOString(),
    context,
    error: {
      message: errorMessage,
      stack: errorStack,
    },
    metadata,
    environment: process.env.NODE_ENV,
  };

  // Always log to console
  console.error(`[Error - ${context}]`, errorDetails);

  // Send to Sentry only in production
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(error, {
      tags: {
        context,
      },
      extra: {
        ...metadata,
        environment: process.env.NODE_ENV,
      },
    });
  }
}
