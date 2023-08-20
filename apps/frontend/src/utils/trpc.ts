// src/utils/trpc.ts
import { createTRPCNext } from "@trpc/next";
import { httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "@acme/api";
import { transformer } from "@acme/api/transformer";

const getBaseUrl = () => {
  if (typeof window === "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  // return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
  // return `http://localhost:${process.env.PORT ?? 4444}`; // dev SSR should use localhost
  return `http://localhost:${4444}`; // dev SSR should use localhost
};
console.log({ trpcbaseurl: getBaseUrl() })

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          // url: `${getBaseUrl()}/api/trpc`,
          url: `${getBaseUrl()}/trpc`,
          headers: {
            type: "application/json"
          }
        }),
      ],
    };
  },
  ssr: false,
});
