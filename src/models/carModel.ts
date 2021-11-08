import { mongoose } from "../db/db";
const { Schema } = mongoose;
const carSchma = new Schema(
  {
    name: /*司机id*/ {
      type: Array,
      require: true,
    },
    carNumber: /*车牌号*/ {
      type: String,
      required: true,
    },
    load: /*载重*/ {
      type: Number,
      required: true,
    },
    type: /*车辆类型*/ {
      type: Number,
      required: true,
    },
    departmentId: /*所属机构*/ {
      type: String,
      required: true,
    },
    mileage: /*里程*/ {
      type: Number,
      required: false,
    },
    remark: /*备注*/ {
      type: String,
      required: false,
    },
  },
  { versionKey: false }
);
export default mongoose.model("user ", carSchma);
