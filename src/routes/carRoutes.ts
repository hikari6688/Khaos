// const Router = require('koa-router');
import { Context } from "koa";
import * as Router from "koa-router";
const router = new Router();
import {
  addCar,
  getCarListPage,
  removeCar,
  updateCar,
  findCarById,
} from "../service/carService";
//添加
router.post("/addCar", async (ctx: Context) => {
    console.log(ctx.body)
  const result = await addCar(ctx);
  ctx.body = result;
});
//查找
router.get("/getCarListPage", async (ctx: Context) => {
  const result = await getCarListPage(ctx);
  ctx.body = result;
});
//删除
router.post("/removeCar", async (ctx: Context) => {
  const result = await removeCar(ctx);
  ctx.body = result;
});
//修改
router.post("/updateCar", async (ctx: Context) => {
  const result = await updateCar(ctx);
  ctx.body = result;
});
//获取详情
router.get("/getEmployDetail", async (ctx: Context) => {
  const result = await findCarById(ctx);
  ctx.body = result;
});
export default router.routes();
