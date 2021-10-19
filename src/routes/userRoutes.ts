// const Router = require('koa-router');
import { Context } from "koa";
import * as Router from "koa-router";
const router = new Router();
import { registerService, login, getUserListPage } from "../service/userService";
//添加登录用户
router.post("/register", async (ctx: Context) => {
  const result = await registerService(ctx);
  ctx.body = result;
});
//登陆
router.post("/login", async (ctx: Context) => {
  const result = await login(ctx);
  ctx.body = result;
});
//查找用户
router.get("/getUserListPage", async (ctx: Context) => {
  const result = await getUserListPage(ctx);
  ctx.body = result;
});
//删除用户

//修改用户信息
export default router.routes();
