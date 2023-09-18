import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

import { NotesRouter } from './notes-router'
import { createContext, createRouter } from '../trpc'

export const appRouter = createRouter({
  notes: NotesRouter
})
export const trpcRouterMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext
})
export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
