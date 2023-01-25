const db=require('../helper/mySql');

module.exports = function(props){
    return{
        getCartProducts,
        getProductByCart,
        saveCartProducts,
        increaseCartProduct,
        decreaseCartProduct,
        deleteCartProduct,
        emptyCart
    }
}

async function getCartProducts(payload){
    let sqlStmt=`SELECT product_cart.*,product_image.image_url,product_cart.quantity as cart_quantity,product_cart.product_id,
    product.product_name,product.product_price,product.category_id from product_cart INNER JOIN product ON product_cart.product_id=product.id
     LEFT JOIN product_image ON product_image.product_id=product.id WHERE user_id="${payload.userId}"`;

    try{
        console.log(sqlStmt);
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(error){
        return {status:500,response:null,error:err}
    }
}

async function getProductByCart(payload){
    sqlStmt=`SELECT * FROM product_cart WHERE user_id="${payload.userId}" AND product_id=${payload.productId}`;
    try{
        console.log(sqlStmt);
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function saveCartProducts(payload){
    let sqlStmt=`INSERT INTO product_cart(user_id,product_id,quantity,price) VALUES("${payload.userId}","${payload.productId}","${payload.quantity}","${payload.price}")`;
    try{
        console.log(sqlStmt)
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function increaseCartProduct(payload){
    let sqlStmt=`UPDATE product_cart SET quantity=${payload.quantity}+1,updated_at=now() WHERE user_id="${payload.userId}" AND product_id="${payload.productId}"`;
    try{
        console.log(sqlStmt);
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function decreaseCartProduct(payload){
    let sqlStmt=`UPDATE product_cart SET quantity=quantity-1,updated_at=now() WHERE user_id="${payload.userId}" AND product_id="${payload.productId}"`;
    try{
        console.log(sqlStmt);
        let result=await db.query(sqlStmt)
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function deleteCartProduct(payload){
    let sqlStmt=`DELETE FROM product_cart WHERE user_id="${payload.userId}" AND product_id="${payload.productId}"`;
    try{
        console.log(sqlStmt)
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function emptyCart(payload){
    let sqlStmt=`DELETE FROM product_cart WHERE user_id="${payload.userId}"`;
    try{
        console.log(sqlStmt);
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}