import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'
export const env = createEnv({
  server: {
    DATABASE_URL: z
      .string({ required_error: 'DATABASE_URL is obligatory!' })
      .min(4)
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL
  }
})
