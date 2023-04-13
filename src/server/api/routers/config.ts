import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const configRouter = createTRPCRouter({
  getFBDB: publicProcedure.query(() => {
    return process.env.FIREBASE_DB;
  }),
});
