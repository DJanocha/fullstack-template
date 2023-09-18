import express from 'express'
import { trpcRouterMiddleware } from './router'
import { ApiPort as port } from '@monorepo/shared/constants'
import cors from 'cors'
const app = express()

app.use(cors())

app.use('/trpc', trpcRouterMiddleware)

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
