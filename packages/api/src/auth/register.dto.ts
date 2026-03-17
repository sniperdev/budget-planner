import { z } from 'zod';

export const registerSchema = z.object({
    email: z.email(),
    fullName: z.string().trim().min(1).max(120),
    password: z.string().min(6).max(128),
}).strict();

export type RegisterInput = z.infer<typeof registerSchema>;