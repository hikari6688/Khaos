import { Context } from "koa";
import departmentDao from "../dao/departmentDao";
import department from "../models/departmentModel";
import { node2Tree } from "../utils";

//新增机构
export const addDepartment = async function (ctx: any) {
  const { name, address, parentId, sort, remark } = ctx.request.body;
  const unique = await departmentDao.findDepartmentByQuery({ name });
  console.log(unique);
  if (unique && unique.length) {
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
    msg: "机构添加成功!",
  };
  return res;
};

//删除机构
export const removeDepartment = async function (ctx: any) {
  const query = ctx.request.body;
  const { id } = query;
  const deps = await departmentDao.findDepartmentByQuery();
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

export const getDeptLeafOrList = async function (ctx: any) {
  const { parentId } = ctx.request.query;
  /**
   * 参数带id 查询当前id节点下的叶子节点 不带id查询根节点
   */
  if (parentId) {
    const data = await departmentDao.findDepartmentByQuery({ parentId });
    return {
      code: 200,
      msg: "success",
      data,
    };
  } else {
    const data = await departmentDao.findDepartmentByQuery({ parentId: "0" });
    return {
      code: 200,
      msg: "success",
      data,
    };
  }
};

export const getDeptTree = async function (ctx: any) {
  const { parantId, name='' } = ctx.request.query;
  /**
   * 参数带id 查询当前id节点下的叶子节点 不带id查询根节点
   */
  let nodes = await departmentDao.findDepartmentByQuery({ name });
  nodes = JSON.parse(JSON.stringify(nodes));
  const _tree = [];
  node2Tree(nodes, _tree, "0");
  return {
    code: 200,
    msg: "success",
    data: _tree,
  };
};

// 查找机构列表和详情
export const getDeptDetail = async function (ctx: any) {
  const query = ctx.request.query;
  const data = departmentDao.findDepartmentByQuery(query);
  return {
    code: 200,
    msg: "success",
    data,
  };
};

export const updateDepartment = async function (ctx: any) {
  const query = ctx.request.body;
  const department = await departmentDao.updateDepartment(query as any);
  return {
    code: 200,
    msg: "机构信息修改成功",
  };
};
