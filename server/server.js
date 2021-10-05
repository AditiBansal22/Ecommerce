const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
const {readdirSync} = require('fs')
require('dotenv').config()

const authRoutes = require('./routes/auth');
const app = express();

// mongoose.connect(process.env.DATABASE, {
   
//  })
// .then(
//     ()=>console.log('DB Connected')
// )
// .catch(err => console.log(`DB Connection Error ${err}`))

try {
      mongoose.connect('mongodb+srv://aditibansal:Adivik1122@ecommerce.km3zj.mongodb.net/test',
      //mongoose.connect('mongodb://localhost:27017/ecom-udemy',
     {
         useNewUrlParser: true
     });
  } catch (error) {
    console.log(`DB Connection Error ${err}`);
  }


//middlewares
app.use(morgan("dev"));
//app.use(bodyparser.json({limit: "2mb"}));
app.use(cors());
//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended: true}));

//.use(bodyparser.json({ limit: '50mb' }))
//app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))


//app.use(express.json());
//app.use(express.json({limit: '50mb'}));
//app.use('/api',authRoutes);


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));



readdirSync('./routes').map((r) => app.use("/api",require("./routes/"+r)));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));