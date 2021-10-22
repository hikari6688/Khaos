import { omit, pick } from "lodash";
import { Context } from "koa";
import userDao from "../dao/userDao";
import user from "../models/userModel";
import { serialize, compareHash } from "../utils";
const jwt = require("jsonwebtoken");
import { IPage } from "../interface";
interface IgetUserListPage {
  name: string;
  idCard: string;
  page: IPage;
}
export const registerService = async function (ctx: any) {
  const { name, account, roleId, idCard, gender, password } = ctx.request.body;
  const unique = await userDao.findUserByAccount({ account });
  if (unique.length) {
    ctx.throw(500, { errorCode: 500, message: "该账号已被占用" });
  }
  const pwd = await serialize(password);
  const newUser = new user({
    name,
    account,
    roleId,
    idCard,
    gender,
    password: pwd,
  });
  let userResult = await userDao.register(newUser);
  const res = {
    ...omit(userResult._doc, ["password"]),
    code: 200,
    msg: "用户添加成功!",
  };
  return res;
};

export const login = async function (ctx: any) {
  const { password, account } = ctx.request.body;
  const result = await userDao.login(account);
  if (!result) {
    ctx.throw(500, { errorCode: 500, message: "账号错误!" });
  }
  const hashPwd = result.password;
  const match = await compareHash(password, hashPwd);
  if (!match) {
    ctx.throw(500, { errorCode: 500, message: "密码错误!" });
  }
  const token = jwt.sign({ password, account }, "zola_zhang", {
    expiresIn: 60,
  });
  return {
    code: 200,
    msg: "登录成功!",
    data: { ...pick(result, ["name", "account"]), token },
  };
};

export const getUserListPage = async function (ctx: Context) {
  const query = ctx.request.query;
  const userList = await userDao.getUserListPage(query as any);
  return userList;
};

export const removeUser = async function (ctx: Context) {
  const query = ctx.request.query;
  const user = await userDao.removeUser(query as any);
  return user;
};

export const updateUser = async function (ctx: Context) {
  const query = ctx.request.query;
  const user = await userDao.updateUser(query as any);
  return userDao;
};
export const getUserDetail = async function (ctx: Context) {
  const query = ctx.request.query;
  const user = await userDao.findUserById(query as any);
  return user;
};
