import { object, string } from 'zod'

const footerSchema = object({
  email: string()
    .email({ message: 'Invalid email address' }),
})

export default footerSchema