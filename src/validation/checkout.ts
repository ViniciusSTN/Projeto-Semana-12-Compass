import { object, string } from 'zod'

const checkoutSchema = object({
  firstName: string()
    .min(2, { message: 'It must be at least 2 characters long' })
    .max(50, { message: 'It must be at most 50 characters long' })
    .refine((value) => !/\d/.test(value), {
      message: 'It cannot contain numbers',
    }),

  lastName: string()
    .min(2, { message: 'It must be at least 2 characters long' })
    .max(50, { message: 'It must be at most 50 characters long' })
    .refine((value) => !/\d/.test(value), {
      message: 'It cannot contain numbers',
    }),

  companyName: string()
    .max(50, { message: 'It must be at most 50 characters long' }),

  zipCode: string()
    .max(9, { message: 'It must be at most 9 characters long' })
    .refine((value) => /^\d{5}-\d{3}$/.test(value), {
      message: 'It must be in the correct format (example: 00000-000)',
    }),

  country: string()
    .min(2, { message: 'It must be at least 2 characters long' })
    .max(50, { message: 'It must be at most 50 characters long' }),

  streetAddress: string()
    .min(2, { message: 'It must be at least 2 characters long' })
    .max(50, { message: 'It must be at most 50 characters long' }),

  city: string()
    .min(2, { message: 'It must be at least 2 characters long' })
    .max(50, { message: 'It must be at most 50 characters long' }),

  province: string()
    .min(2, { message: 'It must be at least 2 characters long' })
    .max(50, { message: 'It must be at most 50 characters long' }),

  addOnAddress: string()
    .min(2, { message: 'It must be at least 2 characters long' })
    .max(50, { message: 'It must be at most 50 characters long' }),

  email: string()
    .email({ message: 'Invalid email address' }),

  additionalInfo: string()
    .min(2, { message: 'It must be at least 2 characters long' })
    .max(50, { message: 'It must be at most 100 characters long' }),
})

export default checkoutSchema
