const backend=require('../backend/cart')({})

module.exports=function(props){
    return{
        getCartProducts,
        saveCartProducts,
        increaseCartProduct,
        decreaseCartProduct,
        deleteCartProduct,
        emptyCart
    }
}

async function getCartProducts(req,res){
    let payload=req.body;
    console.log(payload)
    payload={userId:req.user.id,...payload}
   
    let options=await backend.getCartProducts(payload);
    let totalPrice = 0
    if(options.status == 200 && options.response.length > 0 ){
        totalPrice = options.response.map((item) => item.product_price * item.quantity).reduce((p,n) => p + n)
    }
    console.log(totalPrice)
    options.totalPrice = totalPrice
    res.send(options)
}

async function saveCartProducts(req,res){
    let payload=req.body;
    payload={
        userId:req.user.id,
        ...payload
    }
    let isProductAvailable=await backend.getProductByCart(payload);
    if(isProductAvailable.status!=200){
        return res.send(isProductAvailable)
    }
    if(isProductAvailable.response.length>0){
        //update quantity
       let options=await backend.increaseCartProduct(payload)
       return res.send(options)
    }else{
        // insert record with one quantity into cart
        let options=await backend.saveCartProducts(payload);
        return res.send(options)
    }
}

async function increaseCartProduct(req,res){
    let payload=req.body;
    payload={userId:req.user.id,...payload}
    let options=await backend.increaseCartProduct(payload);
    return res.send(options)
}

async function decreaseCartProduct(req,res){
    let payload=req.body;
    payload={userId:req.user.id,...payload};
    let options= await backend.decreaseCartProduct(payload)
    return res.send(options)
}

async function deleteCartProduct(req,res){
    let payload=req.body;
    payload={userId:req.user.id,...payload};
    let options=await backend.deleteCartProduct(payload);
    return res.send(options)
}

async function emptyCart(req,res){
    let payload=req.body;
    payload={userId:req.user.id,...payload};
    let options=await backend.emptyCart(payload)
    return res.send(options)
}