import { mongoose } from "../db/db";
const { Schema } = mongoose;
const employeeSchma = new Schema(
  {
    name: /*姓名*/ {
      type: String,
      require: true,
    },
    gender: /*性别*/ {
      type: Number,
      require: true,
    },
    idCard: /*身份证号码*/ {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    photo: /*头像*/ {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);
export default mongoose.model("employee ", employeeSchma);
