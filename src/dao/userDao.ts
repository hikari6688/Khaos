//dao层只用关心和数据库的连接
//暴露对数据库操作的方法出去
import userModel from "../models/userModel";
const register = async function (data:any) {
  return await userModel.create(data);
};
//根据用户姓名查询
const findUserByName = async function (data:any) {
  return await userModel.find(data);
};
//根据用户唯一id查询
const findUserById = async function (data:any) {
  return await userModel.findOne(data);
};
//登陆
const login = async function (data:any) {
  return await userModel.findOne({ name: data.name });
};

export default {
  login,
  findUserById,
  findUserByName,
  register,
};
