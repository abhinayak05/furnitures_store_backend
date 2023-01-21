const backend = require('../backend/products')({})
const {uploadImage}=require('../config/helper')

module.exports = function () {
    return {
        getProducts,
        getProductById,
        getProductsByCatId,
        saveProducts,
        updateProducts,
        deleteProducts,
        uploadProductImg,
        saveProductRequest,
        getProductRequests
    }
}


async function getProducts(req, res){
    let payload={};
    let options=await backend.getProducts(payload);
    res.send(options)
}

async function getProductById(req, res){
    let payload=req.body;
    let options=await backend.getProductById(payload);
    res.send(options)
}

async function getProductsByCatId(req, res){
    let payload=req.body;
    let options=await backend.getProductsByCatId(payload);
    res.send(options)
}

async function saveProducts(req, res){
    let payload=req.body;
    let options=await backend.saveProducts(payload);
    res.send(options)
}

async function updateProducts(req, res){
    let payload=req.body;
    let options=await backend.updateProducts(payload);
    res.send(options)
}

async function deleteProducts(req,res){
    let payload=req.body;
    let options=await backend.deleteProducts(payload);
    res.send(options)
}

async function uploadProductImg(req,res){
   let payload=req.body;
   uploadImage(req,res,function(error){
    if(error){
        return res.send({status: 500, error, response: null })
      } else {
          console.log(req.files)
          return  res.send({status: 200, error, response: req.files[0]})
      }
   })
}

async function getProductRequests(req,res){
    let payload={};
    let options=await backend.getProductRequests(payload)
    res.send(options)
}

async function saveProductRequest(req,res){
    let payload=req.body;
    let options=await backend.saveProductRequest(payload)
    res.send(options)
}

