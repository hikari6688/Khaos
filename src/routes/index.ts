import userRoutes from "../routes/userRoutes";
import employeeRoutes from "../routes/employeeRoutes";
const Router = require("koa-router");
const router = new Router();
router.use("/api/user", userRoutes);
router.use("/api/employee", employeeRoutes);
export default router;
