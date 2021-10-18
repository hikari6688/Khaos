import userDao from "../dao/userDao";
import user from "../models/userModel";
import { serialize } from "../utils";
const jwt = require("jsonwebtoken");

export const registerService = async function (ctx: any) {
  const { name, account, roleId, idCard, gender, passWord } = ctx.request.body;
  let unique = await userDao.findUserByName({ account });
  if (unique.length) {
    return ctx.throw(500, "用户名已被注册");
  }
  const pwd = await serialize(passWord);
  const newUser = new user({
    name,
    account,
    roleId,
    idCard,
    gender,
    passWord: pwd,
  });
  return await userDao.register(newUser);
};

// export const findUserByName = async function (data) {
//   return await userDao.findUserByName(data);
// };
// export const findUserById = async function (data) {
//   return await userDao.findUserById(data);
// };
// //登陆验证
// export const login = async function (data) {
//   //获取用户输入的明文密码
//   const passWord = data.passWord;
//   //获取数据库的hahs密码
//   const result = await login(data);
//   const hashPass = result.passWord;
//   //进行hash对比
//   const loginResult = async function checkUser(username, password) {
//     const match = await bcrypt.compare(passWord, hashPass);
//     // const privateKey = fs.readFileSync('private.key');
//     // const token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
//     var token = jwt.sign(
//       { nam: data.name, passWord: data.passWord },
//       "shhhhh",
//       { expiresIn: "12h" }
//     );
//     // jwt.verify(token, 'shhhhh', function(err, decoded) {
//     //   console.log(decoded) // bar
//     // });
//     if (match) {
//       //密码正确
//       return {
//         status: 200,
//         data: {
//           token: `Bearer ${token}`,
//           name: result.name,
//           age: result.age,
//           gender: result.gender,
//         },
//         message: "登陆成功",
//       };
//     } else {
//       //密码错误
//       return {
//         status: 200,
//         data: null,
//         message: "用户密码错误",
//       };
//     }
//   };
//   return await loginResult();
// };
