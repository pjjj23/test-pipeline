import { z } from 'zod'

export const registerSchema = z.object({
  employee_id:z.string(),
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['User', 'Admin'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
  password2: z.string(),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"],
});

export type RegisterFormData = z.infer<typeof registerSchema>
