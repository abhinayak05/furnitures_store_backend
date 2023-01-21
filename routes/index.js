
const userModel=require('../model/user')({})
const categoryModel=require('../model/category')({})
const productModel=require('../model/products')({})
const jwt=require('jsonwebtoken')
const cartModel=require('../model/cart')({})
const orderModel=require('../model/orders')({})
module.exports=(router,expresApp)=>{
    router.post('/saveuser',userModel.saveUser)
    router.post('/userLogin',userModel.processLogin)
    router.post('/emailExist',userModel.emailExist)
    
    router.post('/getCategories',categoryModel.getCategories)
    router.post('/getCategoryById',categoryModel.getCategoryById)
    
    router.post('/saveCategories',adminAuthenticateToken,categoryModel.saveCategories)
    router.post('/updateCategory',adminAuthenticateToken,categoryModel.updateCategory)
    router.post('/deleteCategory',adminAuthenticateToken,categoryModel.deleteCategory)

    router.post('/getProducts',productModel.getProducts)
    router.post('/getProductsById',productModel.getProductById)
    router.post('/getProductsByCatId',productModel.getProductsByCatId)
    router.post('/product/request',productModel.saveProductRequest)

    router.post('/saveProducts',adminAuthenticateToken,productModel.saveProducts)
    router.post('/updateProducts',productModel.updateProducts)
    router.post('/deleteProducts',adminAuthenticateToken,productModel.deleteProducts)
    router.post('/upload',productModel.uploadProductImg)
    router.post('/productRequests',adminAuthenticateToken,productModel.getProductRequests)


    router.post('/getCartProducts',authenticateToken,cartModel.getCartProducts)
    router.post('/increaseCartProduct',cartModel.increaseCartProduct)
    router.post('/decreaseCartProduct',cartModel.decreaseCartProduct)

    router.post('/saveCartProducts',authenticateToken,cartModel.saveCartProducts)
    router.post('/deleteCartProduct',authenticateToken,cartModel.deleteCartProduct)

    router.post('/getOrdersByUser',authenticateToken,orderModel.getOrdersByUserId)

    router.post('/getAllOrders',adminAuthenticateToken,orderModel.getAllOrders)
    router.post('/saveOrders',authenticateToken, orderModel.saveOrder)
    router.post('/updateOrder',orderModel.updateOrder)
    router.post('/orders/updateStatus',adminAuthenticateToken,orderModel.updateOrderStatus)
    

    router.get('/protected', authenticateToken, function(req, res) {
        res.send(req.user)
    })
    
    return router
}   


const authenticateToken=(req,res,next)=>{
    console.log('headers-----------',req.headers)
    console.log(req.headers['authorization'].replace('Bearer ',''));
    let token=req.headers['authorization'].replace('Bearer ','');
    // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZnVsbF9uYW1lIjoiQWJoaXNoZWsgTmF5YWsiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiZW1haWwiOiJhYmhpMDVAZ21haWwuY29tIiwicGhvbmUiOiI4Mjc3NTE5MzA0IiwiaWF0IjoxNjY5MTg1NzQ5LCJleHAiOjE2NjkyNzIxNDl9.-DlZNPkdsULcNRZlJXamC9QOFAjm3lFafFvPpptGQmI";

    try{
        const user=jwt.verify(token,'mySecreteKey')
        console.log(user)
        req.user=user;
        next()
    }catch(error){
        console.log('Em..i here')
        req.headers['authorization'] = null
       req.user = null
       return res.send({status:403,error:'User is Unauthenticated',response:null,message:error})
    }
}

const adminAuthenticateToken=(req,res,next)=>{
    console.log(req.headers['authorization'].replace('Bearer ',''));
    let token=req.headers['authorization'].replace('Bearer ','');
    // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZnVsbF9uYW1lIjoiQWJoaXNoZWsgTmF5YWsiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiZW1haWwiOiJhYmhpMDVAZ21haWwuY29tIiwicGhvbmUiOiI4Mjc3NTE5MzA0IiwiaWF0IjoxNjY5MTg1NzQ5LCJleHAiOjE2NjkyNzIxNDl9.-DlZNPkdsULcNRZlJXamC9QOFAjm3lFafFvPpptGQmI";

    try{
        const user=jwt.verify(token,'mySecreteKey')
        console.log(user)
        req.user=user;
        if(user.user_type=='admin'){
            next()
        }else{
            return location.href='/login'
        }
    }catch(error){
        console.log('Em..i here')
        req.headers['authorization'] = null
       req.user = null
       return res.send({status:403,error:'User is Unauthenticated',response:null,message:error})
    }
}


