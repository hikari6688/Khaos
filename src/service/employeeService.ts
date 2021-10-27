import { omit, uniq } from "lodash";
import { Context } from "koa";
import employeeDao from "../dao/employeeDao";
import employee from "../models/employeeModel";
export const addEmployee = async function (ctx: any) {
  const { name, idCard, avatar, gender, phoneNumber } = ctx.request.body;
  const unique = await employeeDao.findEmployeeById({ idCard });
  if (unique) {
    ctx.throw(500, { errorCode: 500, message: "该身份证已被注册" });
  }
  const newUser = new employee({
    name,
    idCard,
    gender,
    avatar,
    phoneNumber,
  });
  let employeeResult = await employeeDao.addEmployee(newUser);
  const res = {
    data: employeeResult,
    code: 200,
    msg: "用户添加成功!",
  };
  return res;
};

export const getEmployeeListPage = async function (ctx: Context) {
  const query = ctx.request.query;
  const employeeList = await employeeDao.getEmployeeListPage(query as any);
  return employeeList;
};

export const removeEmployee = async function (ctx: Context) {
  const query = ctx.request.query;
  const employee = await employeeDao.removeEmployee(query as any);
  return {
    code: 200,
    msg: "用户删除成功",
  };
};

export const updateEmployee = async function (ctx: any) {
  const query = ctx.request.body;
  const employee = await employeeDao.updateEmployee(query as any);
  return {
    code: 200,
    msg: "用户信息修改成功",
  };
};

export const findEmployeeById = async function (ctx: Context) {
  const query = ctx.request.query;
  const employee = await employeeDao.findEmployeeById(query as any);
  return employee;
};
