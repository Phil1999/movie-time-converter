import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();


// Function to format the runtime
function formatRuntime(runtime: number): string {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}hr ${minutes}min`;
}

// Middleware for logging
app.use("*", async (ctx, next) => {
  console.log(`[REQUEST] ${ctx.req.method} ${ctx.req.url}`);
  
  const start = Date.now();
  await next();
  const duration = Date.now() - start;

  console.log(
    `[RESPONSE] ${ctx.req.method} ${ctx.req.url} - ${ctx.res.status} (${duration}ms)`
  );
});

// Endpoint for movie runtime.
app.get(
  "/format-runtime",
  zValidator("query", z.object({ runtime: z.string() })),
  (ctx) => {

    const { runtime } = ctx.req.valid("query");
    const runtimeNum = parseInt(runtime, 10);

    // Validating the runtime value.
    if (isNaN(runtimeNum) || runtimeNum < 0) {
      return ctx.json({ error: "Runtime must be a positive integer" }, 400);
    }

    const formattedRuntime = formatRuntime(runtimeNum);

    return ctx.json({
      original_runtime: runtimeNum,
      formatted_runtime: formattedRuntime,
    });
  }
);

// Catch-all for unknown issues
app.onError((err, ctx) => {
  console.error(`[ERROR] ${err.message}`)
  return ctx.json({ error: 'Internal Server Error' }, 500)
})

export default app;
