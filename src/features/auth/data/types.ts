import { z } from "zod";

export const UserZod = z.object({
  id: z.string(),
  name: z.string(),
  last_name: z.string(),
  middle_name: z.string().nullable(),
  email: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type User = z.infer<typeof UserZod>;

export interface SignUpInput {
  name: string;
  last_name: string;
  middle_name?: string | null;
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}
