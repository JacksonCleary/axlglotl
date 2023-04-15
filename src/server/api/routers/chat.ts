import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
const chatLog: string[] = ["test"];

export const chatRouter = createTRPCRouter({
  getChatlog: publicProcedure.query(() => {
    return chatLog;
  }),
  addChatInput: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input }) => {
      const { text } = input;
      chatLog.push(text);
    }),
});
