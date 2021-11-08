import { mongoose } from '../db/db';
const { Schema } = mongoose;
const elevatorSchma = new Schema(
  {
    name: /*升降机名称*/ {
      type: String,
      require: true,
    },
    code: /*设备序号*/ {
      type: String,
      required: true,
    },
    driverId: /*升降机操作人员*/ {
      type: String,
      required: false,
    },
    manufacturers: /*制造厂家*/ {
      type: String,
      required: true,
    },
    PropertyUnit: /*设备产权单位*/ {
      type: String,
      required: false,
    },
    height: /*升降机高度*/ {
      type: Number,
      required:true,
    },
    load: /*额定载重*/ {
      type: Number,
      required: true,
    },
    manufactureDate: /*生产日期*/ {
      type: String,
      required:false,
    },
    remark: /*备足*/ {
      type: String,
      required: false,
    },
  },
  { versionKey: false }
);
export default mongoose.model('elevator ', elevatorSchma);
