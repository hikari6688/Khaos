import userModel from "../models/userModel";
import { IPage } from "../interface";
interface IgetUserListPage {
  name: string;
  idCard: string;
  page: IPage;
}

const register = async function (data: any) {
  return await userModel.create(data);
};
//根据用户姓名查询
const findUserByAccount = async function (params: any) {
  return await userModel.find(params);
};
//根据用户唯一id查询
const findUserById = async function (data: any) {
  return await userModel.findOne(data);
};
//删除用户
const removeUser = async function (data: any) {
  return await userModel.deleteOne({ _id: data.id });
};
//修改用户信息
const updateUser = async function (data: any) {
  return await userModel.updateOne({ _id: data.id }, data);
};
//登陆
const login = async function (account: string) {
  return await userModel.findOne({ account });
};
const getUserListPage = async function (query?: IgetUserListPage) {
  const { name, idCard, page } = query;
  const { current = 1, pageSize = 10 } = page;
  console.log(query);
  const filter = {
    $or: [
      { name: { $regex: name, $options: "$i" } },
      { idCard: { $regex: idCard } },
    ],
  };
  let result: any = {};
  result.total = await userModel.find(filter).countDocuments();
  console.log(result);
  result.data = await userModel
    .find(filter)
    .skip((Number(current) - 1) * Number(pageSize))
    .limit(Number(pageSize));

  return result;
};
export default {
  login,
  findUserById,
  findUserByAccount,
  register,
  getUserListPage,
  removeUser,
  updateUser,
};
