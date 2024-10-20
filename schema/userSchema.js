const { z } = require('zod');

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(9)
})

module.exports = userLoginSchema