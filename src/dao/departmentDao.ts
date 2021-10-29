import departmentModel from "../models/departmentModel";

const addDepartment = async function (data: any) {
  return await departmentModel.create(data);
};

const findDepartmentByQuery = async function (data: any) {
  return await departmentModel.findOne(data);
};

const removeDepartment = async function (data: any) {};

const getAlldeps = async function (arg?) {
  return await departmentModel.find(arg);
};

const updateDepartment = async function (data: any) {
  return await departmentModel.updateOne({ _id: data.id }, data);
};

export default {
  findDepartmentByQuery,
  addDepartment,
  removeDepartment,
  updateDepartment,
  getAlldeps,
};
