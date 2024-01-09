import express from 'express'
import 'dotenv/config'
import mongoose, { Schema } from 'mongoose'
import cors from 'cors'




const app = express()

const port = process.env.PORT
app.use(express.json())
app.use(cors())

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    oldPrice: Number,
    relatedProducts: Array,
    photo_url: String,  
    rating: {
       type: Number,
       default: 2
       
       
     },
  });  
  const productModel = mongoose.model("myProducts", productSchema);

  app.get("/", async (req, res) => {
    try {
      const product = await productModel.find({});
      res.status(200).json(product);
    } catch (error) {
      res, send("");
    }
  });
  
  app.get('/:id', async (req, res) => {
    const { id } = req.params;  
    const product = await productModel.findById(id);
    res.send(product);
  });
  
  app.post("/", async (req, res) => {
    const { name, category, price, oldPrice,relatedProducts,photo_url,rating } = req.body;
    const newproduct = new productModel({ name, category, price, oldPrice,relatedProducts,photo_url,rating });
    await newproduct.save();
    res.send("Got a Post request");
  });
  
  app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category, price, oldPrice,relatedProducts,photo_url,rating } = req.body;
    const product = await productModel.findByIdAndUpdate(id,{ name, category, price, oldPrice,relatedProducts,photo_url,rating });
    res.send(product);
  });
  
  app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    res.send(product);
  });
  
  mongoose.connect(process.env.SECRET_KEY)
  .then(() => console.log('Connected!'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})