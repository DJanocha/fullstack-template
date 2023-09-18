import { z } from 'zod'
export const createNewNoteSchema = z.object({
  text: z.string().min(3).max(245),
  assigneeName: z.string()
})
