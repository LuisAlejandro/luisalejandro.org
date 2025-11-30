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
  let errorMessage: string;
  let errorStack: string | undefined;

  if (error instanceof Error) {
    errorMessage = error.message;
    errorStack = error.stack;
  } else if (typeof error === "object" && error !== null) {
    try {
      errorMessage = JSON.stringify(error);
    } catch {
      errorMessage = String(error);
    }
    errorStack = undefined;
  } else {
    errorMessage = String(error);
    errorStack = undefined;
  }

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
