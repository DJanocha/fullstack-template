'use client'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter, RouterInputs, RouterOutputs } from '@monorepo/api'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { env } from '../env'

export const trpc = createTRPCReact<AppRouter>()
const { NEXT_PUBLIC_API_URL } = env

export type { RouterInputs, RouterOutputs }

export function TRPCProvider({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          //let's use process.env later, but for now let it be hardocoded
          url: NEXT_PUBLIC_API_URL
            ? `${env.NEXT_PUBLIC_API_URL}/trpc`
            : 'http://localhost:5555/trpc',
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              api_token: '123'
              // authorization: getAuthCookie(),
            }
          }
        })
      ]
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
