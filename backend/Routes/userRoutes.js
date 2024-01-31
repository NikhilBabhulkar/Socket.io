const express = require('express')
const {registerUser,authUser,allUser} = require("../Controllers/UserControllers")
const {protect} = require("../middleware/AuthMiddleware")

const router = express.Router()

router.route("/").post(registerUser).get(allUser)
router.post('/login',authUser)

module.exports = router