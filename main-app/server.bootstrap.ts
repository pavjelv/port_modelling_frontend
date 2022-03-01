import "zone.js/node";

import { ngExpressEngine } from "@nguniversal/express-engine";
import * as express from "express";
import { join } from "path";

import { AppServerModule } from "./src/main.server";
import { APP_BASE_HREF } from "@angular/common";
import { existsSync } from "fs";
import {createProxyMiddleware} from "http-proxy-middleware";
import * as morgan from "morgan";
import * as compression from "compression";

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), "dist/port-modelling-fe/browser");
  const indexHtml = existsSync(join(distFolder, "index.original.html")) ? "index.original.html" : "index";
  // tslint:disable-next-line:no-shadowed-variable
  const { createProxyMiddleware } = require("http-proxy-middleware");

  server.use(compression());
  server.use(morgan("tiny"));
  // Proxy endpoints
  server.use("/api/calculate", createProxyMiddleware({
    target: process.env.BACKEND_URL || "http://localhost:8000",
    changeOrigin: true,
    pathRewrite: {
      [`^/api/calculate`]: "",
    },
  }));

  server.use("/api/common", createProxyMiddleware({
    target: process.env.BACKEND_URL || "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: {
      [`^/api/common`]: "",
    },
  }));

  server.use("/files/images", createProxyMiddleware( {
    target: process.env.BACKEND_URL || "http://localhost:8080",
    changeOrigin: true
  }));

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine("html", ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set("view engine", "html");
  server.set("views", distFolder);

  // Serve static files from /browser
  server.get("*.*", express.static(distFolder, {
    maxAge: "1y"
  }));

  // All regular routes use the Universal engine
  server.get("*", (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

export function run(): void {
  const port = process.env.PORT || 5000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export * from "./src/main.server";
