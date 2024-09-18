const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter= require("./routes/userRoute");


mongoose.connect('mongodb://127.0.0.1:27017/karam')
.then(()=> console.log("Connect successfully!"))
.catch((err)=> console.log("Found Error", err));


// Admin Schema

const adminSchema = mongoose.Schema({
  username:{
      type: String,
      required:true
  },
 
  email:{
      type:String,
      required:true,
      unique:true
  },
  password:{
      type:String
  }
});

const Admin = mongoose.model('admin', adminSchema);


//  middleware
app.use(express.json());
app.use(cors());


app.post('/adlogin', async (req, res)=>{
  const {email, password} = req.body;
  const admin = await Admin.findOne({email})
  if(admin){
    if(admin.password===password){
      return res.send({msg:"Login Success"});
    }
    else{
      return res.send({msg:"Invalid Password"})
    }
  }
  else{
    return res.send({msg:"Admin Not Exist"});
  }
})


app.use(userRouter)

app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`);
    
})