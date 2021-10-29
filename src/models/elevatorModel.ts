import { mongoose } from "../db/db";
const { Schema } = mongoose;
const userSchma = new Schema(
  {
    name: /*升降机名称*/ {
      type: String,
      require: true,
    },
    code: /*设备序号*/ {
      type: String,
      required: true,
    },
    driver: {
      type: Array,
      required: false,
    },
    manufacturers: /*制造厂家*/ {
      type: String,
      required: true,
    },
    PropertyUnit: /*设备产权单位*/ {
      type: String,
      required: true,
    },
    height: /*升降机高度*/ {
      type: Number,
      required: true,
    },
    manufactureDate: /*生产日期*/ {
      type: String,
      required: false,
    },
  },
  { versionKey: false }
);
export default mongoose.model("user ", userSchma);
