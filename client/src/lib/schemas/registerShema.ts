import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/
);


export const registerSchema = z.object({
  email: z.email(),
  password: z.string().regex(passwordValidation, {
    message: 'Password must be at least 8 characters long and must contain 1 lowercase, 1 uppercase, 1 number and 1 special character.'
  })

})

export type RegisterSchema = z.infer<typeof registerSchema>;