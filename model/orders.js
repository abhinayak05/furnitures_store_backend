const { sendEmail } = require('../config/helper');

const backend = require('../backend/orders')({})

module.exports = function (props) {
    return {
        getAllOrders,
        getOrdersByUserId,
        saveOrder,
        updateOrder,
        updateOrderStatus
    }
}

async function getAllOrders(req, res) {
    let payload = req.body;
    console.log(payload)
    let options = await backend.getAllOrders(payload)
    res.send(options)
}

async function getOrdersByUserId(req, res) {
    let payload = req.body;
    console.log(payload)
    payload = { userId: req.user.id, ...payload }
    console.log('payload::', { userId: req.user.id, ...payload });
    let options = await backend.getOrdersByUserId(payload);
    res.send(options)
}

async function
    saveOrder(req, res) {
    let payload = req.body;
    payload = { userId: req.user.id, ...payload }
    console.log(payload)
    let cartProducts = await backend.getCartProducts(payload);
    if (cartProducts.status != 200) {
        return res.send(cartProducts)
    }
    if (cartProducts.response.length === 0) {
        return res.send({ status: 403, response: null, error: 'Cart is Empty' })
    }
    let generateOrderResponse = await backend.saveOrder(payload);
    if (generateOrderResponse.status != 200) {
        return res.send(generateOrderResponse)
    }

    let orderId = generateOrderResponse.response.insertId
    console.log(orderId)

    payload = { orderId: orderId, ...payload }
    console.log(payload)
    let cartItems = cartProducts.response;
    console.log(cartItems)
    payload = { cartItems, ...payload }
    console.log(payload)

    let options = await backend.saveOrderItems(payload);
    if (options.status == 200) {
        let emailOptions = {
            email: payload.email,
            message: `Hi ${payload.name}, Your order has been placed`
        }
        sendEmail(emailOptions)
    }
    res.send(options)
}

async function updateOrder(req, res) {
    let payload = req.body
    let options = await backend.updateOrder(payload);
    res.send(options)
}

async function updateOrderStatus(req, res) {
    let payload = req.body
    let options = await backend.updateOrderStatus(payload);
    res.send(options)
}