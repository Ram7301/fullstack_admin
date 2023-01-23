import mongoose from "mongoose";

const ListviewSchema = mongoose.Schema({
     listViewName:String,
     Data:{
        columns:[
            {
                field:String,
                headerName:String,
                flex:Number,
            }
        ],
        rows:[
            {
              type: new mongoose.Schema({
                firstName: {
                  type: String,
                  // required: true,
                  min: 2,
                  max: 50,
                },
                lastName: {
                  type: String,
                  // required: true,
                  min: 2,
                  max: 50,
                },
                email: {
                  type: String,
                  // required: true,
                  max: 50,
                  unique: true,
                },
                password: {
                  type: String,
                  // required: true,
                  min: 5,
                },
                picturePath: {
                  type: String,
                  default: "",
                },
              
                location: String,
                occupation: String,
              
              },{timestamps:true})},
              
        ],
     }

},


);
const Listview = mongoose.model("Listview", ListviewSchema);
export default Listview;