import * as Sentry from "@sentry/nextjs";

interface ErrorContext {
  [key: string]: any;
}

/**
 * Next.js throws these to interrupt render for notFound()/forbidden()/
 * unauthorized()/redirect(). They are control flow, not failures.
 */
function isNextNavigationError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("digest" in error)) {
    return false;
  }

  const digest = (error as { digest?: unknown }).digest;
  if (typeof digest !== "string") {
    return false;
  }

  return (
    digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;") ||
    digest.startsWith("NEXT_REDIRECT;")
  );
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
  // Do not log or report intentional App Router navigation signals.
  // Pages wrap data fetching in try/catch and call notFound() inside; catching
  // that throw would otherwise spam Sentry (and consoleLoggingIntegration).
  if (isNextNavigationError(error)) {
    return;
  }

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
