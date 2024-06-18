import { object, string } from 'zod'

const loginSchema = object({
  name: string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' })
    .refine((value) => !/\d/.test(value), {
      message: 'It cannot contain numbers',
    }),

  email: string()
    .email({ message: 'Invalid email address' }),

  password: string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
    }),

  passwordConfirm: string()
    .min(8, { message: 'Password confirmation must be at least 8 characters long' }),
}).superRefine(({ passwordConfirm, password }, ctx) => {
  if (passwordConfirm !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['passwordConfirm']
    })
  }
})

export default loginSchema
