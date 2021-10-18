import userRoutes from '../routes/userRoutes'
const Router = require('koa-router');
const router = new Router()
router.use('/api/user', userRoutes);
export default router
