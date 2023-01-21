const path = require('path');
var template;
module.exports=function({htmlTamplates}){
    template=htmlTamplates;
    return{
        renderIndex,
        renderLogin,
        renderDashboard,
        renderProducts,
        renderCategory,
        renderOrders,
        renderRequests
    }
}

function renderIndex(req, res){
    res.redirect('/login')
    // res.sendFile(path.join(template,'admin','login.html'))
}

function renderLogin(req,res){
    res.sendFile(path.join(template,'admin','login.html'))
}

function renderDashboard(req,res){
    res.sendFile(path.join(template,'admin','dashboard.html'))
}

function renderProducts(req,res){
    res.sendFile(path.join(template,'admin','products.html'))
}

function renderCategory(req,res){
    res.sendFile(path.join(template,'admin','category.html'))
}

function renderOrders(req,res){
    res.sendFile(path.join(template,'admin','orders.html'))
}

function renderRequests(req,res){
    res.sendFile(path.join(template,'admin','requests.html'))
}