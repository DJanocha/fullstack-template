import trpcExpress from '@trpc/server/adapters/express'
import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { TRPCError } from '@trpc/server'
export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    // const getUser = () => {
    //     if (req.headers.authorization !== 'secret') {
    //         return null;
    //     }
    //     return {
    //         name: 'alex',
    //     };
    // };
    const getAuth = () => {
        if (req.headers.authorization !== 'secret') {
            return {
                userId: null
            };
        }
        return {
            userId: '123'
        }
    }

    return {
        req,
        res,
        auth: getAuth(),
    };
};
type Context = inferAsyncReturnType<typeof createContext>;


const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }
    return next({
        ctx: {
            auth: ctx.auth,
        },
    });
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);