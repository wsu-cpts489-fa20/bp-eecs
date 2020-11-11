import express from 'express'
import authRoutes from 'auth/routes'
import userRoutes from 'user/routes'
import roundRoutes from 'round/routes'

const router = express.Router()

router
    .use('/auth', authRoutes)
    .use('/users', userRoutes)
    .use('/rounds', roundRoutes)

export default router;
