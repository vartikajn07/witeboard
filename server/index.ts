import { createServer } from "http";

import express from "express";
import next, { NextApiHandler } from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();
  const server = createServer(app);

  app.all("*", (req: any, res: any) => {
    return nextHandler(req, res);
  });

  server.listen(port, () => {
    console.log(`server is ready on ${port}`);
  });
});
