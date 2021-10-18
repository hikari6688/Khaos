// const Router = require('koa-router');
import * as Router from "koa-router";
const router = new Router();
// const { register, findUserById, findUserByName,login } = require('../../service/userService');
import { registerService } from "../service/userService";
router.post("/register", async (ctx:any) => {
  const result = await registerService(ctx);
  ctx.body = result;
});
// router.post('/checkUserName', async ctx => {
//   const result = await findUserByName(ctx.request.body);
//   ctx.body = {
//     msg: result
//   };
// });
// router.post('/findUser', async ctx => {
//   const result = await findUserById(ctx.request.body);
//   ctx.body = {
//     msg: result
//   };
// });
// //登陆
// router.post('/login', async ctx => {
//   const result = await login(ctx.request.body);
//   ctx.body = result;
// });
export default router.routes();
