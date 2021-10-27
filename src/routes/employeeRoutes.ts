// const Router = require('koa-router');
import { Context } from "koa";
import * as Router from "koa-router";
const router = new Router();
import {
  addEmployee,
  getEmployeeListPage,
  removeEmployee,
  updateEmployee,
  findEmployeeById,
} from "../service/employeeService";
//添加登录用户
router.post("/addEmployee", async (ctx: Context) => {
  const result = await addEmployee(ctx);
  ctx.body = result;
});
//查找用户
router.get("/getEmployeeListPage", async (ctx: Context) => {
  const result = await getEmployeeListPage(ctx);
  ctx.body = result;
});
//删除用户
router.post("/removeEmployee", async (ctx: Context) => {
  const result = await removeEmployee(ctx);
  ctx.body = result;
});
//修改用户信息
router.post("/updateEmployee", async (ctx: Context) => {
  const result = await updateEmployee(ctx);
  ctx.body = result;
});
//获取用户详情
router.get("/getEmployDetail", async (ctx: Context) => {
  const result = await findEmployeeById(ctx);
  ctx.body = result;
});
export default router.routes();
