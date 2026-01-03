import express from 'express'

import { signup, login, confirm, profile, forgotPassword, verifyNewPasswordToken, newPassword } from '../controllers/veterinario.js'
import authenticationMiddleware from "../middlewares/authentication.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get('/confirm/:token', confirm)
router.get('/profile', authenticationMiddleware, profile)
router.post('/forgot-password',forgotPassword)
router.route('/forgot-password/:token')
    .get(verifyNewPasswordToken)
    .post(newPassword)

export default router;