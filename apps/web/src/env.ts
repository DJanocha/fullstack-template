import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z
      .string({ required_error: 'NEXT_PUBLIC_API_URL is obligatory!' })
      .min(4)
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  }
})
