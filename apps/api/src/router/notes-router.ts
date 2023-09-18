import { createRouter, publicProcedure } from '../trpc'
import { z } from 'zod'
import { createNewNoteSchema } from '@monorepo/shared/validationSchemas/api/notes'

export const NotesRouter = createRouter({
  getNotes: publicProcedure.query(
    async ({ ctx }) => await ctx.prisma.note.findMany()
  ),
  createNote: publicProcedure.input(createNewNoteSchema).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.note.create({
        data: {
          text: input.text
        }
      })
  ),
  deleteNote: publicProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(
      async ({ ctx, input }) =>
        await ctx.prisma.note.delete({
          where: {
            id: input.id
          }
        })
    )
})
