

module.exports=(router,expresApp,htmlTamplates)=>{
    const frontendModel=require('../model/frontend')({htmlTamplates})
    console.log(htmlTamplates)
    router.get('/',frontendModel.renderIndex)
    router.get('/login',frontendModel.renderLogin)
    router.get('/admin/dashboard',frontendModel.renderDashboard)
    router.get('/admin/products',frontendModel.renderProducts)
    router.get('/admin/category',frontendModel.renderCategory)
    router.get('/admin/orders',frontendModel.renderOrders)
    router.get('/admin/requests',frontendModel.renderRequests)
    return router
}