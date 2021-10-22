// const Router = require('koa-router');
import { Context } from "koa";
import * as Router from "koa-router";
const router = new Router();
import {
  registerService,
  login,
  getUserListPage,
  removeUser,
  updateUser,
  getUserDetail
} from "../service/userService";
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
router.post("/removeUser", async (ctx: Context) => {
  const result = await removeUser(ctx);
  ctx.body = result;
});
//修改用户信息
router.post("/updateUser", async (ctx: Context) => {
  const result = await updateUser(ctx);
  ctx.body = result;
});
//获取用户详情
router.get("/getUserDetail", async (ctx: Context) => {
  const result = await getUserDetail(ctx);
  ctx.body = result;
});
export default router.routes();
