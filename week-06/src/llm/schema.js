
const { z } = require("zod");

const triageOutputSchema = z
  .object({
    category: z.enum(["billing", "bug", "feature", "other"]),

    urgency: z.enum(["low", "normal", "high"]),

    confidence: z.number().min(0).max(1),

    reason: z.string().trim().min(1),
  })
  .strict();

const triageInputSchema = z
  .object({
    text: z.string().trim().min(1).max(2000),
  })
  .strict();

module.exports = {
  triageInputSchema,
  triageOutputSchema,
};
