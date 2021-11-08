import { omit, uniq } from "lodash";
import { Context } from "koa";
import carDao from "../dao/carDao";
import car from "../models/carModel";
import employeeDao from "../dao/employeeDao";
import departmentDao from "../dao/departmentDao";
export const addCar = async function (ctx: any) {
  const { driverId, carNumber, load, type, departmentId, mileage, remark } =
    ctx.request.body;
  const unique = await carDao.findCarById({ carNumber });
  if (unique) {
    ctx.throw(500, { errorCode: 500, message: "该车牌号已被占用" });
  }
  const newUser = new car({
    driverId,
    carNumber,
    load,
    type,
    departmentId,
    mileage,
    remark,
  });
  let carResult = await carDao.addCar(newUser);
  const res = {
    data: carResult,
    code: 200,
    msg: "工程车添加成功!",
  };
  return res;
};

export const getCarListPage = async function (ctx: Context) {
  const query = ctx.request.query;
  const CarListPage = await carDao.getCarListPage(query as any);
  const carData = CarListPage.data; //每页车辆数据
  const { driverIds, departmentId } = carData;
  const curDeptInfo = await departmentDao.getDeptsById(departmentId);
  const ids = [];
  const names = [];
  for (let item of driverIds) {
    const driver = await employeeDao.findEmployeeById(item);
    const { _id, name } = driver;
    ids.push(_id);
    names.push(name);
  }
  const result = carData.map((item) => {
    const { driverId, carNumber, load, type, departmentId, mileage, remark } =
      item;
    return {
      driverId,
      carNumber,
      load,
      type,
      departmentId,
      mileage,
      remark,
      driverIds: ids,
      driverNames: names,
    };
  });
  return { ...CarListPage, data: result, code: 200 };
};

export const removeCar = async function (ctx: any) {
  const query = ctx.request.body;
  const car = await carDao.removeCar(query as any);
  return {
    code: 200,
    msg: "工程车删除成功",
  };
};

export const updateCar = async function (ctx: any) {
  const query = ctx.request.body;
  const car = await carDao.updateCar(query as any);
  return {
    code: 200,
    msg: "工程车信息修改成功",
  };
};

export const findCarById = async function (ctx: Context) {
  const query = ctx.request.query;
  const car = await carDao.findCarById(query as any);
  return car;
};
