import { response } from "../middlewares";

const bcrypt = require("bcryptjs");

type PropertyName = string | number | symbol;

export const serialize = (params: string | undefined): Promise<any> => {
  if (!params) return Promise.reject("params id required");
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(params, salt, function (err: string, hash: string) {
        if (err) throw new Error(err);
        return resolve(hash);
      });
    });
  });
};

export const compareHash =  (data: string, hash: string):Promise<boolean>=> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hash, function (err, res) {
      resolve(res);
    });
  });
};

export function pick<T extends object, K extends keyof T>(
  object: T | undefined | null,
  v: Array<keyof T>
): Omit<T, K> {
  if (!object || !v || !v.length) return object;
  return v.reduce((pre: any, cur) => {
    pre[cur] = object[cur];
    return pre;
  }, {});
}

export function omit<T extends object, K extends keyof T>(
  object: T | undefined | null,
  v: Array<keyof T>
): Omit<T, K> {
  if (!object || !v || !v.length) return object;
  const ks = Object.keys(object);
  return ks.reduce((pre: any, cur: any) => {
    if (!v.includes(cur)) pre[cur] = object[cur];
    return pre;
  }, {});
}

export function intall(app: any, args: any[]): void {
  args.forEach((middleware) => {
    app.use(middleware);
  });
}

export function generateToken() {}
