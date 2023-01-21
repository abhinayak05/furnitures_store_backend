const backend=require('../backend/category')({});


module.exports=function(props){
    return{
        getCategories,
        saveCategories,
        getCategoryById,
        updateCategory,
        deleteCategory
    }
}

async function getCategories(req,res){
    let payload={};
    let options=await backend.getCategories(payload);
    res.send(options)
}

async function saveCategories(req,res){
    let payload=req.body;
    let options=await backend.saveCategories(payload);
    res.send(options)
}

async function getCategoryById(req,res){
    let payload=req.body;
    let options=await backend.getCategoryById(payload);
    res.send(options);
}

async function updateCategory(req,res){
    let payload=req.body;
    let options=await backend.updateCategory(payload);
    res.send(options);
}

async function deleteCategory(req,res){
    let payload=req.body;
    let options=await backend.deleteCategory(payload);
    res.send(options);
}