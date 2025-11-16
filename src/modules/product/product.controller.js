const Product  = require('./product.model');

const getProducts = async(req, res)=>{
    try{
        const products = await Product.findAll({ });

        res.status(200).send(products);
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal server Error')
    }
}

const getProduct = async(req, res)=>{
    try{
        const { id } = req.params;

        const product = await Product.findOne({ where:{ id } })
        if(!product) return res.status(404).send('Product not found');

        res.status(200).send(product);
    }
     catch(err){
        console.log(err)
        res.status(500).send('Internal server error')
     }
}

const postProduct =  async (req, res)=>{ 
    try{
        const { name, category, price, description } = req.body;

        const existProduct = await Product.findOne({ where: {name} });

        if(existProduct) return res.status(400).send("Already product exist");
        
        const product = await Product.create({
            name,
            category,
            price,
            description
         })

         res.status(201).send(product);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
}

const putProduct = async(req, res)=>{
    try{
        const {id} = req.params;
        const {name, category, price, description} = req.body;

        const existProduct = await Product.findOne({ where:{ id } })
        if(!existProduct) return res.status(404).send("Product not found")

        const product = await Product.update({
            name,
            price,
            category, 
            description
        },{
            where:{
                id
            }
        })
        return res.status(200).send(product);
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internal server error')
    }
}


const patchProduct = async(req, res)=>{
    try{
        const {id} = req.params;
        const {name, category, price, description } = req.body;

        const product = await Product.findOne({ where:{ id } })
        if(!product) return res.status(404).send("Product not found")
        
        if(name) product.update({name});
        if(category) product.update({category});
        if(price) product.update({price});
        if(description) product.update({description});

        return res.status(200).send(product);
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Internal server error")
    }
}


const deleteProduct = async (req, res)=>{
     try{
        const {id} = req.params;
        
        const product = await Product.findOne({where:{id}})
        if(!product) return res.status(404).send("Product not found");

        await product.destroy();

        return res.status(200).send(product);
     }
     catch(err){
        console.log(err);
        return res.status(500).send('Internal server error')
     }
}

module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.postProduct = postProduct;
module.exports.putProduct = putProduct;
module.exports.patchProduct = patchProduct;
module.exports.deleteProduct = deleteProduct;