import * as mongoose from "mongoose";
import { mongoURI } from "../config";

const options = {
  useNewUrlParser: true,
  autoIndex: false,
};

const createConnection = async (): Promise<typeof import("mongoose")> => {
  return await mongoose.connect(mongoURI, options);
};

mongoose.connection.on("connected", (): void => {
  console.log("Mongoose connection open to " + mongoURI);
});

/**
 * 连接异常 error 数据库连接错误
 */

mongoose.connection.on("error", (err: string): void => {
  console.log("Mongoose connection error: " + err);
});

/**
 * 连接断开 disconnected 连接异常断开
 */

mongoose.connection.on("disconnected", (): void => {
  console.log("Mongoose connection disconnected");
});

export { mongoose, createConnection };
