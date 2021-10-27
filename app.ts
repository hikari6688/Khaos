import { createConnection } from "./src/db/db";
import { catchError, response } from "./src/middlewares";
import * as tstatic from 'koa-static'
import router from "./src/routes";
import * as Koa from "koa";
const app = new Koa();
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const path = require("path");
import { intall } from "./src/utils";
intall(app, [catchError]);
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    // encoding: "gzip",
    formidable: {
      uploadDir: "./",
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        //文件保存之前的预处理
        file.path = file.name; //保存文件名改为源文件的文件名，否则文件名随机
      },
    },
  })
);
//静态文件托管
// app.use(tstatic(__dirname, './images'));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7782;
app.listen(port, () => {
  console.log(`---server running in ${port}---@Khaos`);
  createConnection();
});
