import { z } from "zod";

export const profileSchema = z.object({
  username: z.string().trim().min(3).max(30),
  displayName: z.string().trim().min(1).max(50).optional(),
  avatarUrl: z.string().url().optional(),
});
