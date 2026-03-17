import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(128),
}).strict();

export type LoginInput = z.infer<typeof loginSchema>;