import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "yarn/env.mjs";
import { createTRPCContext } from "yarn/server/api/trpc";
import { appRouter } from "yarn/server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
