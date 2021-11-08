import { omit, uniq } from 'lodash';
import { Context } from 'koa';
import elevatorDao from '../dao/elevatorDao';
import elevator from '../models/elevatorModel';
import employeeDao from '../dao/employeeDao';
export const addElevator = async function (ctx: any) {
  const { name, code, driverId, manufacturers, remark, PropertyUnit, height, manufactureDate, load } = ctx.request.body;
  const unique = await elevatorDao.findElevatorById({ code });
  if (unique) {
    ctx.throw(500, { errorCode: 500, message: '该序号已被占用' });
  }
  const newUser = new elevator({
    name,
    code,
    driverId,
    manufacturers,
    PropertyUnit,
    height,
    manufactureDate,
    load,
    remark,
  });
  let elevatorResult = await elevatorDao.addElevator(newUser);
  const res = {
    data: elevatorResult,
    code: 200,
    msg: '升降机添加成功!',
  };
  return res;
};

export const getElevatorListPage = async function (ctx: Context) {
  const query = ctx.request.query;
  const ElevatorListPage = await elevatorDao.getElevatorListPage(query as any);
  function makeList() {
    return new Promise((resolve, reject) => {
      const dataWithName = ElevatorListPage.data.map((item) => {
        const { name, code, driverId, manufacturers, PropertyUnit, height, manufactureDate, load,remark } = item;
        employeeDao.findEmployeeById({ _id: driverId }).then((r) => {
          return {
            name,
            code,
            driverId,
            manufacturers,
            PropertyUnit,
            height,
            manufactureDate,
            load,
            remark,
            driverName: r.name || null,
          };
        });
      });
      resolve(dataWithName);
    });
  }
  return makeList().then((r) => {
    return { ...ElevatorListPage, data: r };
  });
};

export const removeElevator = async function (ctx: any) {
  const query = ctx.request.body;
  const elevator = await elevatorDao.removeElevator(query as any);
  return {
    code: 200,
    msg: '升降机删除成功',
  };
};

export const updateElevator = async function (ctx: any) {
  const query = ctx.request.body;
  const elevator = await elevatorDao.updateElevator(query as any);
  return {
    code: 200,
    msg: '升降机信息修改成功',
  };
};

export const findElevatorById = async function (ctx: Context) {
  const query = ctx.request.query;
  const elevator = await elevatorDao.findElevatorById(query as any);
  return elevator;
};
