export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // This file configures the initialization of Sentry on the server.
    // The config you add here will be used whenever the server handles a request.
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/

    console.log("[Sentry] Initializing Sentry on Node.js runtime");
    console.log(`[Sentry] DSN configured: ${!!process.env.SENTRY_DSN}`);

    const Sentry = await import("@sentry/nextjs");

    Sentry.init({
      dsn: process.env.SENTRY_DSN,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });

    console.log("[Sentry] Successfully initialized on Node.js runtime");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // This file configures the initialization of Sentry for edge features.
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/

    console.log("[Sentry] Initializing Sentry on Edge runtime");
    console.log(`[Sentry] DSN configured: ${!!process.env.SENTRY_DSN}`);

    const Sentry = await import("@sentry/nextjs");

    Sentry.init({
      dsn: process.env.SENTRY_DSN,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });

    console.log("[Sentry] Successfully initialized on Edge runtime");
  }
}

export async function onRequestError(
  err: Error,
  request: {
    path: string;
    method?: string;
    headers?: Record<string, string | string[] | undefined>;
  },
  context: {
    routerKind: string;
    routePath: string;
    routeType: string;
  }
) {
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(
    err,
    {
      path: request.path,
      method: request.method || "GET",
      headers: request.headers || {},
    },
    {
      routerKind: context.routerKind,
      routePath: context.routePath,
      routeType: context.routeType,
    }
  );
}
