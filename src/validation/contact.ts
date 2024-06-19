import { object, string } from 'zod'

const contactSchema = object({
  name: string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' })
    .refine((value) => !/\d/.test(value), {
      message: 'It cannot contain numbers',
    }),

  email: string()
    .email({ message: 'Invalid email address' }),

  subject: string()
    .max(50, { message: 'Name must be at most 50 characters long' }),
  
  message: string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(250, { message: 'Name must be at most 250 characters long' })
})

export default contactSchema
