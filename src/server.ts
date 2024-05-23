import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.db as string);

    app.listen(config.port, () => {
      console.log(`Express app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
