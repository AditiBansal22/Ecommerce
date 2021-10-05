const admin = require('../firebase');
const User = require('../models/user');

exports.authCheck = async(req,res,next) => 
{
    console.log("header",req.header);
   try{
        const firebaseUser =await admin.auth().verifyIdToken(req.headers.authtoken);
        //console.log('firebase user in authecheck', firebaseUser);
        req.user = firebaseUser; //add more properties to req object
        next();
   }
   catch(err)
   {
      res.status(401).json({
          err:"Invalid or expired token"
      }) 
   }
}

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;
  
    const adminUser = await User.findOne({ email }).exec();
  
    if (adminUser.role !== "admin") {
      res.status(403).json({
        err: "Admin resource. Access denied.",
      });
    } else {
      next();
    }
  };
  