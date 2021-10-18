const bcrypt = require("bcryptjs");

export const serialize = (params: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(params, salt, function (err: string, hash: string) {
        if (err) throw new Error(err);
        return resolve(hash);
      });
    });
  });
};

export const compareHash = async (param, hash) => {
  return bcrypt.compare(param, hash, function (err, res) {
    return Promise.resolve(res);
  });
};
