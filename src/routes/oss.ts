const fs = require("fs");
const path = require("path");
const { resolve } = require("path");
const os = require("os");
export async function fileUpload(ctx, next) {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  const type = file.name.split(".")[1];
  file.name = new Date().getTime() + "." + type;
  // 创建可读流
  console.log(file.path);
  const reader = fs.createReadStream(file.path);
  const filePath = path.join(path.resolve("./static", "oss", file.name));
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return (ctx.body = {
    status: "200",
    message: "文件上传成功",
    data: {
      imgurl: "/oss/" + file.name,
    },
  });
}
