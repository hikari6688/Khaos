import { mongoose } from '../db/db';
const { Schema } = mongoose;
const userSchma = new Schema(
  {
    name: /*姓名*/ {
      type: String,
      require: true,
    },
    gender: /*性别*/ {
      type: Number,
      require: true,
    },
    account: /*账号*/ {
      type: String,
      require: true,
    },
    password: /*密码*/ {
      type: String,
      require: true,
    },
    roleId: /*角色id*/ {
      type: String,
      require: false,
    },
    idCard: /*身份证号码*/ {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);
export default mongoose.model('user ', userSchma);
