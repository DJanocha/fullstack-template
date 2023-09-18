import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '@monorepo/db'
import superjson from 'superjson'
import { ZodError } from 'zod'

const prisma = new PrismaClient()

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  // later you can extract use using request and db
  const user = null
  return { req, res, prisma, user }
}

export type Context = inferAsyncReturnType<typeof createContext>
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    }
  }
})
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' })
  }
  return next({
    ctx
  })
})
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthed)
export const createRouter = t.router
