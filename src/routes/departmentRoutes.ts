// const Router = require('koa-router');
import { Context } from "koa";
import * as Router from "koa-router";
const router = new Router();
import {
  addDepartment,
  removeDepartment,
  getDeptLeafOrList,
  getDeptTree,
  getDeptDetail,
  updateDepartment,
} from "../service/departmentService";
//添加机构
router.post("/addDepartment", async (ctx: Context) => {
  const result = await addDepartment(ctx);
  ctx.body = result;
});
//查找机构[第一层或者按id查找对应叶子节点]
router.get("/getDeptLeafOrList", async (ctx: Context) => {
  const result = await getDeptLeafOrList(ctx);
  ctx.body = result;
});
//查找机构[所有机构按树形返回]
router.get("/getDeptTree", async (ctx: Context) => {
  const result = await getDeptTree(ctx);
  ctx.body = result;
});

//删除机构
router.post("/removeDepartment", async (ctx: Context) => {
  const result = await removeDepartment(ctx);
  ctx.body = result;
});
//修改机构信息
router.post("/updateDepartment", async (ctx: Context) => {
  const result = await updateDepartment(ctx);
  ctx.body = result;
});
//获取机构详情
router.get("/getDeptDetail", async (ctx: Context) => {
  const result = await getDeptDetail(ctx);
  ctx.body = result;
});
export default router.routes();
