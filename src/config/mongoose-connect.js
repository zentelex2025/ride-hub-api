import mongoose from "mongoose";
import logger from "./logger.js";

export default async function dataBaseConnection() {
  const url = process.env.MONGO_DB_URL;
  const db_name = process.env.MONGO_DB_NAME;

  try {
    await mongoose.connect(url, {
      dbName: db_name ?? "rent-hub",
    });

    logger.info(`mongodb is connected to ${mongoose.connection.name}`);
  } catch (error) {
    logger.error(`catch mongoose-connect.js ${error.message}`);
    process.exit(1);
  }
}
