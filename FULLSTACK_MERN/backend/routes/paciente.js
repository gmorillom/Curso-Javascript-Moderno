import express from "express"

import Paciente from "../models/paciente.js"
import Veterinario from "../models/veterinario.js"
import { deletePatient, getPatient, getPatients, registerPatient, updatePatient } from "../controllers/paciente.js"
import authenticationMiddleware from "../middlewares/authentication.js"

const router = express.Router()

router.route("/")
    .post(authenticationMiddleware, registerPatient)
    .get(authenticationMiddleware, getPatients)

router.get("/:id", authenticationMiddleware, getPatient)
router.put("/:id", authenticationMiddleware, updatePatient)
router.delete("/:id", authenticationMiddleware, deletePatient)

export default router

