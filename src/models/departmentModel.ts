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
      require: false,
    },
    parentId: /*上级机构id*/ {
      type: String,
      required: true,
    },
    sort: /*排序*/ {
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
export default mongoose.model("department", departmentSchma);
