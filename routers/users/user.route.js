
const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user.controller');
const TokenVerify =require('../../middleware/tokenVerify')
router
    .get("/lists",TokenVerify,UserController.userList)
    .get("/findOne/:id",TokenVerify, UserController.findOneUser)
    .post("/create", UserController.createUser)
    .post("/update", UserController.updateUser)
    .post("/delete",UserController.deleteUser)
 
module.exports=router
