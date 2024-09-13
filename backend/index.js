const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname:{
      type: String,
      required:true
  },
  lastname:{
    type:String
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
mongoose.connect('mongodb://127.0.0.1:27017/karam')
.then(()=> console.log("Connect successfully!"))
.catch((err)=> console.log("Found Error", err));
const User = mongoose.model('user', userSchema);


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

const Admin = mongoose.model('admin', userSchema);




//  middleware
app.use(express.json());
app.use(cors());

app.post('/', async (req, res) =>{
    const result = await User.create(req.body);
    return res.send({msg:"Success"})
})

app.post('/login', async (req, res)=>{
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(user){
    if(user.password===password){
      return res.send({msg:"Login Success"});
    }
    else{
      return res.send({msg:"Invalid Password"})
    }
  }
  else{
    return res.send({msg:"User Not Exist"});
  }
})


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

app.get('/', async (req, res) =>{
    const result = await User.find()
    return res.send(result);
})

app.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const result = await User.findById(id);
    return res.send(result);
})

app.patch('/:id', async (req, res) =>{
  try {
    const id = req.params.id;
    const result = await User.findByIdAndUpdate(id,req.body)
    return res.send({msg:"Success"});  
  } catch (error) {
    return res.send({msg:"Error"});  
  }
})

app.delete('/:id', async (req, res) =>{
   try {
    const id = req.params.id;
    const result= await User.findByIdAndDelete(id)
    return res.send({msg:"Success"});
   } catch (error) {
    return res.send({msg:error});
   }
})


app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`);
    
})