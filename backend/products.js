
const db=require('../helper/mySql');

module.exports=function(props){
    return{
        getProducts,
        getProductById,
        getProductsByCatId,
        saveProducts,
        updateProducts,
        deleteProducts,
        saveProductRequest,
        getProductRequests
    }
}    


async function getProducts(payload){
    let sqlStmt=`SELECT product.*,product_image.image_url FROM product LEFT JOIN product_image ON product.id=product_image.product_id`;
    
    try{
        console.log(sqlStmt);
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function getProductById(payload){
    let sqlStmt=`SELECT product.*,product_image.image_url FROM product LEFT JOIN product_image ON product.id=product_image.product_id WHERE product.id="${payload.id}"`;
    
    try{
        console.log(sqlStmt);
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function getProductsByCatId(payload){
    let sqlStmt=`SELECT * FROM product WHERE category_id="${payload.categoryId}"`;
    try{
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function saveProducts(payload){
    let sqlStmtProduct=`INSERT INTO product(category_id,product_name,product_price,product_description,quantity) VALUES("${payload.categoryId}","${payload.productname}","${payload.price}","${payload.description}","${payload.quantity}")`;
    try{
        console.log(sqlStmtProduct);
        let resultOne=await db.query(sqlStmtProduct);
        let insertId=resultOne.insertId;

        let sqlStmtProductImg=`INSERT INTO product_image(product_id,image_url) VALUES("${insertId}","${payload.imageUrl}")`;
        let resultTwo=await db.query(sqlStmtProductImg)
        return { status:200,response:resultTwo,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function updateProducts(payload){
    let sqlStmtProduct=`UPDATE product SET category_id='${payload.categoryId}',product_name='${payload.productname}',product_price='${payload.price}',product_description='${payload.description}',quantity='${payload.quantity}',updated_at = now() WHERE id='${payload.id}'`;
    try{
        console.log(sqlStmtProduct);
        let result=await db.query(sqlStmtProduct);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
    // try{
    //     console.log(sqlStmtProduct);
    //     let resultOne=await db.query(sqlStmtProduct);
    //     let insertId=resultOne.insertId;

    //     let sqlStmtProductImg=`UPDATE product_image SET image_url="${payload.imageUrl}") WHERE id='${payload.id}'`;
    //     let resultTwo=await db.query(sqlStmtProductImg)
    //     return { status:200,response:resultTwo,error:null}
    // }catch(err){
    //     return {status:500,response:null,error:err}
    // }
}

async function deleteProducts(payload){
    let productSqlStmt=`DELETE FROM product WHERE id="${payload.id}"`;
    try{
        console.log(productSqlStmt);
        let resultOne=await db.query(productSqlStmt);
        let productImgSqlStmt=`DELETE FROM product_image WHERE product_id="${payload.id}"`;
        console.log(productImgSqlStmt);
        let resultTwo=await db.query(productImgSqlStmt);
        return {status:200,response:resultTwo,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function getProductRequests(payload){
    let sqlStmt=`SELECT * FROM product_request`;
    try{
        console.log(sqlStmt);
        let result=await db.query(sqlStmt);
        console.log(result);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function saveProductRequest(payload){
    let sqlStmt=`INSERT INTO product_request (title, requirement_description,email, contact_number) VALUES ("${payload.title}","${payload.description}", "${payload.email}","${payload.phone}")`
    try{
        console.log(sqlStmt);
        let result=await db.query(sqlStmt);
        console.log(result);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}
