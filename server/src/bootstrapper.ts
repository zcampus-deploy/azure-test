import * as debug from "debug";
import * as http from "http";
import * as mongoose from "mongoose";

import expressApplication from "./app";

export function createAndRunServer() {
  const port = process.env.PORT || 3000;

  expressApplication.set("port", port);

  const server: http.Server = http.createServer(expressApplication);
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening(): void {
    const serverAddress = server.address();
    const bind = (typeof serverAddress === "string") ? `pipe ${serverAddress}` : `port ${serverAddress.port}`;
    debug(`Listening on ${bind}`);
  }
}

createAndRunServer();
