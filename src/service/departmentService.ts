import { Context } from "koa";
import departmentDao from "../dao/departmentDao";
import department from "../models/employeeModel";
//新增机构
export const addDepartment = async function (ctx: any) {
  const { name, address, parentId, sort, remark } = ctx.request.body;
  const unique = await departmentDao.findDepartmentByQuery({ name });
  if (unique) {
    ctx.throw(500, { errorCode: 500, message: "该机构名已存在" });
  }
  const newUser = new department({
    name,
    address,
    parentId,
    sort,
    remark,
  });
  let result = await departmentDao.addDepartment(newUser);
  const res = {
    data: result,
    code: 200,
    msg: "用户添加成功!",
  };
  return res;
};
//删除机构
export const removeDepartment = async function (ctx: any) {
  const query = ctx.request.body;
  const { id } = query;
  const deps = await departmentDao.getAlldeps();
  const hasChildren = deps.find((node) => {
    return node.parentId === id;
  });
  if (hasChildren) {
    ctx.throw(500, {
      errorCode: 500,
      message: "当前机构下面存在子机构,删除失败",
    });
  }
  await departmentDao.removeDepartment(query as any);
  return {
    code: 200,
    msg: "机构删除成功",
  };
};

//查询机构[树结构]
export const getDepartmentTree = async function (parantId?: string) {
  /**
   * 参数带id 查询当前id节点下的叶子节点 不带id查询根节点
   */
  if (parantId) {
    return;
  }
};
