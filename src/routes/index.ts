import userRoutes from "./userRoutes";
import employeeRoutes from "./employeeRoutes";
import fileUpload from "./userRoutes";
const Router = require("koa-router");
const router = new Router();
router.use("/api/user", userRoutes);
router.use("/api/employee", employeeRoutes);
router.post("/api/fileUpload", fileUpload);
export default router;
