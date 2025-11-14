
const  users  = require("./routes/user.routes");
const express = require("express");
const app = express();

app.use(express.json());

app.use('/', users);

app.get('/', (req, res)=>{
  res.send('The server is running...');
});

app.listen(5000, ()=>{
  console.log("Server is Running in port 5000")
})