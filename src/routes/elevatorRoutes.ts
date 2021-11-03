// const Router = require('koa-router');
import { Context } from "koa";
import * as Router from "koa-router";
const router = new Router();
import {
  addElevator,
  getElevatorListPage,
  removeElevator,
  updateElevator,
  findElevatorById,
} from "../service/elevatorService";
//添加
router.post("/addElevator", async (ctx: Context) => {
  const result = await addElevator(ctx);
  ctx.body = result;
});
//查找
router.get("/getElevatorListPage", async (ctx: Context) => {
  const result = await getElevatorListPage(ctx);
  ctx.body = result;
});
//删除
router.post("/removeElevator", async (ctx: Context) => {
  const result = await removeElevator(ctx);
  ctx.body = result;
});
//修改
router.post("/updateElevator", async (ctx: Context) => {
  const result = await updateElevator(ctx);
  ctx.body = result;
});
//获取详情
router.get("/getEmployDetail", async (ctx: Context) => {
  const result = await findElevatorById(ctx);
  ctx.body = result;
});
export default router.routes();
