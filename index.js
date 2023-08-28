const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const nodemailer = require("nodemailer")
const app = express();
const url = "mongodb+srv://root:root@cluster0.jxfwzik.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4000;
const userModel = require("./model/user")

//connect with database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connect with database"))
  .catch((err) => console.log(err));

  app.use(express.urlencoded({extended: true}))
  app.use(express.static(path.join(__dirname, '/index.html')));

  app.get("/index",(req,res)=>{
     res.sendFile(__dirname + '/index.html')
  })

app.post('/index', async (req, res) => {
  const user = await userModel.create({
    Name: req.body.Name,
    email: req.body.email,
    mobile:req.body.mobile,
    address:req.body.address
  });
  console.log(user)
  // return res.status(200).json(user);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'heenaecellenttechonologies@gmail.com',
      pass: 'tqizxjetjfzcxmht'
    }
  });
  
  var mailOptions = {
    from: 'heenaecellenttechonologies@gmail.com',
    to: req.body.email,
    subject: 'Exellect technology',
    text: 'thank you for participat'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))