const { z } = require('zod');

const productStoreSchema = z.object({
  name: z.string().min(2),
  description: z.string().max(50),
  price: z.string(),
  quantity: z.string(),
}).required();

module.exports = { productStoreSchema }