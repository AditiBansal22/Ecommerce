const express = require('express');
const router = express.Router();
//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth');
//controller
const  {createOrUpdateUser,currentUser} = require("../controllers/auth");

// const myMiddleware = (req,res,next) =>
// {
//     console.log("I am a middleware");
//     next();
// }


router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
// router.get('/testing',myMiddleware, (req,res)=> {
//     res.json({data: "Successful"});
// });

module.exports =router;