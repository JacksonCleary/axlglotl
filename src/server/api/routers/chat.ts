import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { chatLog } from "../root";
import { handleAddChatInput } from "../handlers";

// https://transform.tools/typescript-to-zod
export const avatarSchema = z.union([
  z.literal("hexagons"),
  z.literal("charlie-brown"),
  z.literal("death-star"),
  z.literal("bamboo"),
  z.literal("bathroom-floor"),
  z.literal("cork-screw"),
  z.literal("brick-wall"),
  z.literal("diagonal-stripes"),
  z.literal("moroccan"),
  z.literal("morphing-diamonds"),
  z.literal("zig-zag"),
  z.literal("endless-clouds"),
  z.literal("overlapping-diamonds"),
]);

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
          avatarID: avatarSchema,
          customUsername: z.string().optional(),
        }),
      })
    )
    .mutation(({ input }) => {
      const { text, user } = input;
      handleAddChatInput(text, user);
    }),
});
