const express = require('express');
const router = express.Router();
//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth');
//controller
const  {createOrUpdateUser,currentUser} = require("../controllers/auth");
const { create,listAll,remove,read } = require("../controllers/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete('/product/:slug',authCheck,adminCheck, remove);
router.get('/product/:slug', read);

module.exports =router;