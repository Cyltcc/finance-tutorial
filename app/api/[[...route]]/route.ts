import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        userId: z.number(),
      })
    ),
    (c) => {
      const { name, userId } = c.req.valid("json");
      return c.json({});
    }
  )
  .get("/test", (c) => {
    return c.json({
      message: "test",
    });
  });

export const GET = handle(app);
export const POST = handle(app);
