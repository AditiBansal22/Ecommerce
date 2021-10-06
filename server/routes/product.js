const express = require('express');
const router = express.Router();
//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth');
//controller
const  {createOrUpdateUser,currentUser} = require("../controllers/auth");
const { create,listAll } = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);

module.exports =router;