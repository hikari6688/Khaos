import { mongoose } from "../db/db";
const { Schema } = mongoose;
const departmentSchma = new Schema(
  {
    name: /*机构名*/ {
      type: String,
      require: true,
    },
    address: /*机构地址*/ {
      type: String,
      require: true,
    },
    parentId: /*上级机构id*/ {
      type: String,
      required: true,
    },
    sort: /*排序*/ {
      type: Number,
      required: true,
    },
    remark: /*备注*/ {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
export default mongoose.model("department", departmentSchma);
