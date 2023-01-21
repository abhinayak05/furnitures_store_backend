const db=require('../helper/mySql');

module.exports = function(props){
    return{
        getAllOrders,
        getOrdersByUserId,
        getCartProducts,
        saveOrder,
        saveOrderItems,
        updateOrder,
        updateOrderStatus
    }
}
async function getAllOrders(payload){
    let sqlStmt=`SELECT product_orders.user_id,product_orders.customer_address1,product_orders.customer_address2,product_orders.email,
    product_orders.contact_number,product_orders.pincode,product_order_items.* FROM product_orders INNER JOIN product_order_items ON product_orders.id=product_order_items.order_id`;
    console.log(sqlStmt)
    try{
       let result=await db.query(sqlStmt)
       return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function getOrdersByUserId(payload){
    let sqlStmt=`SELECT product_orders.user_id,product_orders.customer_address1,product_orders.customer_address2,product_orders.email,
    product_orders.pincode,product_orders.contact_number,product_order_items.* FROM product_orders INNER JOIN product_order_items 
    ON product_orders.id=product_order_items.order_id WHERE user_id="${payload.userId}"`;
    console.log(sqlStmt)
    try{
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function getCartProducts(payload){
    let sqlStmt=`SELECT product.*,product_image.image_url,product_cart.quantity AS product_cart_quantity,product_cart.product_id 
    FROM product_cart INNER JOIN product ON product_cart.product_id=product.id LEFT JOIN product_image ON product_image.product_id=product.id
    WHERE user_id="${payload.userId}"`;
    try{
        let result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}

async function saveOrder(payload){
    let sqlStmt = `INSERT INTO product_orders (user_id,full_name, customer_address1,customer_address2 ,pincode, contact_number, email) VALUES ("${payload.userId}","${payload.fullname}","${payload.address1}", "${payload.address2}","${payload.pincode}","${payload.phone}","${payload.email}")`
   try {
        let response = await db.query(sqlStmt)
        return {status: 200, response, error: null}
    } catch (error) {
        return {status: 500, response:null, error}
    }
}

async function saveOrderItems(payload){
    let sqlStmt=`INSERT INTO product_order_items (order_id, product_id, product_name,quantity, product_price, total_price,image_url) VALUES ?`;
    console.log("item.quantity, item.price")
    console.log(payload.cartItems)
    console.log("item.quantity*item.price")
    try{
        let result = await db.query(sqlStmt,[payload.cartItems.map((item)=>[payload.orderId,item.product_id, item.product_name, item.product_cart_quantity, item.product_price, item.product_cart_quantity*item.product_price, item.image_url])]);
        let emptyCartResponse = await db.query(`Delete from product_cart where user_id = "${payload.userId}"`)
        return {status:200,response:result,error:null}
    }catch(err){
        return {status: 500, response:null, error:err}
    }
}

function updateOrder(payload, callback){
    let sqlStmt = `UPDATE product SET category_id = "${payload.categoryId}" product_name="${payload.productName}", product_price="${payload.productPrice}", product_description = "${product.productDescription}", quantity = "${payload.productQuantity}", updated_at = now() where id = "${payload.id}"`

    db.query(sqlStmt, function(err, response){
        if(!err){
           let options = { status: 200, error: null, response: response} 
           callback(options)
        } else {
           let options = { status: 500, error: err, response: null} 
           callback(options)
        }
    })
}

async function updateOrderStatus(payload,callback){
    let sqlStmt = `UPDATE product_order_items SET delivery_status = "${payload.deliveryStatus}", updated_at = now() where id = "${payload.id}"`
    try{
        let result=await db.query(sqlStmt)
        return { status: 200, error: null, response: result} 
    }catch(err){
        return { status: 500, error: err, response: null} 
    }
}