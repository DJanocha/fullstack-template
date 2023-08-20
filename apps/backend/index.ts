import express, { Express, Request, Response } from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import dotenv from 'dotenv';
import cors from 'cors'
import { appRouter } from './src/router';
import { createContext } from './src/trpc';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 4444;
app.use(cors());

app.use(
    "/trpc",
    createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});