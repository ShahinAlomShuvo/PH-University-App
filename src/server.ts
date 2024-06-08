import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "http";
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db as string);

    server = app.listen(config.port, () => {
      console.log(`Express app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection is detected, shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception is detected, shutting down...");
  process.exit(1);
});
