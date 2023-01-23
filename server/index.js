import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import authRoutes from "./routes/auth.js";
import salesRoutes from "./routes/sales.js";
import path from "path";
import  { fileURLToPath} from "url";
import multer from "multer"
import { register} from "./controllers/auth.js"

/* DATA IMPORTS */
import User from "./modles/User.js";
import Listview from "./modles/Listview.js";
import Product from "./modles/Product.js";
import ProductStat from "./modles/ProductStat.js";
import Transaction from "./modles/Transaction.js";
import { dataUser ,dataProduct, dataProductStat, dataTransaction} from "./data/index.js"



/* CONFIGURATION */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:"true"}));
app.use(bodyParser.urlencoded({ limit:"30mb",extended: false }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const storage  = multer.diskStorage({
  destination: function(req,file,cd){
    cd(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
})

const upload = multer({storage});



/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/auth", authRoutes);


app.post("/auth/register",upload.single("picture"),register)

const Admin =[
//   {
//   listViewName:"Admin",
//   Data:{
//     columns:[{
//       field:"name",
//       headerName:"name",
//       flex:1

//     }
//     ],
//     rows:[{
//       firstName:"Ram",
//       lastName:"Prakash",
//       email:"ram@gmail.com",
//       password:"123",
//     },
    
//   ]
//   } ,
  
  
// },
{
  listViewName:"User",
  Data:{
    columns:[
      {
        field:"data",
        headerName:"data",
        flex:1
      }
    ],
    rows:[{
      firstName:"data",
      lastName:"data",
      email:"data@gmail.com",
      password:"321"
    }]
  }
}

]

  


const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        //User.insertMany(dataUser);
        //Product.insertMany(dataProduct);
        //ProductStat.insertMany(dataProductStat);
        //Transaction.insertMany(dataTransaction);
        // Listview.insertMany(Admin)

        
  })
  .catch((error) => console.log(`${error} did not connect`));
