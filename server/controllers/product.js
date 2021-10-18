const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    console.log(newProduct);
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
  .limit(parseInt(req.params.count))
  .populate('category')
  .populate('subs')
  .sort([['createdAt',"desc"]])
  .exec();
  res.json(products);
};

exports.remove = async(req,res) =>
{
  try {
       const deleted = await Product.findOneAndRemove({slug: req.params.slug}).exec();
       res.json(deleted);
  }
  catch(err){
      console.log(err);
      return res.status(400).send('Product delete failed');
  }
}

exports.read = async(req,res) =>
{
  try {
        const product = await Product.findOne({slug: req.params.slug})
        .populate("category")
        .populate("subs")
        .exec();
        res.json(product);
  }
  catch(err)
  {
    console.log(err.message);
    return res.status(400).send("Read failed");
  }
}


exports.update = async(req,res) =>
{
  try {
         if(req.body.title)
         {
           req.body.slug = slugify(req.body.title);
         }
         const updated = await Product.findOneAndUpdate({slug: req.params.slug}, req.body , {new:true}).exec();
         res.json(updated);
  }
  catch(err)
  {
    console.log('Product update Error ---->',err);
    //return res.status(400).send('Product Update failed');
    res.status(400).json({
      err: err.message,
    });
  }
}

//Without pagination
//exports.list = async(req,res) => {
//   try{
//      const {sort,order,limit} = req.body;
//      const products = await Product.find({})
//      .populate('category')
//      .populate('subs')
//      .sort([[sort, order]])
//      .limit(limit)
//      .exec();

//      res.json(products);
//   }
//   catch(err) {
//     console.log(err);
//   }
// }

exports.productsCount = async(req,res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
}

//With pagination
exports.list = async(req,res) => {
  try{
    const {sort,order,page} = req.body;
    const currentPage =page || 1;
    const perPage = 3;
     const products = await Product.find({})
     .skip((currentPage - 1) * perPage)
     .populate('category')
     .populate('subs')
     .sort([[sort, order]])
     .limit(perPage)
     .exec();

     res.json(products);
  }
  catch(err) {
    console.log(err);
 }
}


//search filter

const handleQuery = async(req,res,query) => {
  const products = await Product.find({$text: {$search : query}})
  .populate('category',"_id name")
  .populate('subs',"_id name")
  .exec();

  res.json(products);
}

const handlePrice = async(req,res,price) => {
 try {
  let products =  await Product.find({
    price:{
      $gte: price[0],
      $lte: price[1]
    }
  }).populate('category',"_id name")
  .populate('subs',"_id name")
  .exec();
  res.json(products);
 }
 catch(err){
   console.log(err);
 }
}

const handleCategory = async(req,res,category) => {
  try {
   let products =  await Product.find({
     category
   }).populate('category',"_id name")
   .populate('subs',"_id name")
   .exec();
   res.json(products);
   
  }
  catch(err){
    console.log(err);
  }
 }


 const handleSub = async(req,res,sub) => {
  try {
   let products =  await Product.find({
     subs: sub
   }).populate('category',"_id name")
   .populate('subs',"_id name")
   .exec();
   res.json(products);
  }
  catch(err){
    console.log(err);
  }
 }

 const handleShipping = async(req,res,shipping) => {
  try {
    console.log("controller shipping --->" + shipping);
   let products =  await Product.find({
         shipping
   }).populate('category',"_id name")
   .populate('subs',"_id name")
   .exec();
   res.json(products);
  }
  catch(err){
    console.log(err);
  }
 }

 const handleColor = async(req,res,color) => {
  try {
   let products =  await Product.find({
     color
   }).populate('category',"_id name")
   .populate('subs',"_id name")
   .exec();
   res.json(products);
  }
  catch(err){
    console.log(err);
  }
 }

 const handleBrand = async(req,res,brand) => {
  try {
   let products =  await Product.find({
     brand
   }).populate('category',"_id name")
   .populate('subs',"_id name")
   .exec();
   res.json(products);
  }
  catch(err){
    console.log(err);
  }
 }

exports.searchFilters = async(req,res) => {
  const {query, price, category, sub, shipping, color, brand} = req.body;
  if(query)
  {
    await handleQuery(req,res,query);
  }

  //price [0,10]
  if(price != undefined)
  {
    //console.log('price --->',price);
    await handlePrice(req,res,price);
  }

  if(category)
  {
    //console.log("category -->",category);
    await handleCategory(req,res,category);
  }

  if(sub)
  {
   // console.log("subcategory -->",sub);
    await handleSub(req,res,sub);
  }

  if(shipping)
  {
    console.log("shipping -->",shipping);
    await handleShipping(req,res,shipping);
  }

  if(color)
  {
    console.log("color -->",color);
    await handleColor(req,res,color);
  }

  if(brand)
  {
    //console.log("shipping -->",shipping);
    await handleBrand(req,res,brand);
  }
}
