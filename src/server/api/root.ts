import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { configRouter } from "~/server/api/routers/config";
import { chatRouter } from "~/server/api/routers/chat";
import { type ChatLog } from "~/models";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  config: configRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export const chatLog Object
// we don't need to persist this because if it doesn't exist in shared WebRTC it should be burned.
export const chatLog: ChatLog = {
  data: [],
};
