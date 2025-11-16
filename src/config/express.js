const path = require("path");
const users = require(path.join(process.cwd(), 'src/modules/user/user.routes.js'));
const products = require(path.join(process.cwd(), 'src/modules/product/product.routes.js'));
const express = require("express");

module.exports = async function(){
  const app = express();

  app.use(express.json());

  users(app);
  products(app);
  // app.use(users);

  app.get('/', (req, res)=>{ res.send('The server is running...') } );

  return app;
}
