import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { chatLog } from "../root";
import { handleAddChatInput } from "../handlers";

export const chatRouter = createTRPCRouter({
  getChatlog: publicProcedure.query(() => {
    return chatLog.data;
  }),
  addChatInput: publicProcedure
    .input(
      z.object({
        text: z.string(),
        user: z.object({
          id: z.string(),
          username: z.string(),
        }),
      })
    )
    .mutation(({ input }) => {
      const { text, user } = input;
      handleAddChatInput(text, user);
    }),
});
