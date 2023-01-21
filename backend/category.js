const db = require('../helper/mySql');
const md5 = require('md5');

module.exports = function (props) {
    return {
        getCategories,
        saveCategories,
        getCategoryById,
        updateCategory,
        deleteCategory
    }
}

async function getCategories(payload) {
    sqlStmt = `SELECT * FROM category`;
    try {
        console.log(sqlStmt);
        const result = await db.query(sqlStmt);
        return { status: 200, response: result, error: null }
    } catch (err) {
        return { status:500,response:null,error:err}
    }
}

async function saveCategories(payload){
    sqlStmt=`INSERT INTO category (category_name,narration) VALUES("${payload.categoryname}","${payload.narration}")`
    try{
        console.log(sqlStmt);
        const result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return { status:500,response:null,error:err}
    }
}

async function getCategoryById(payload){
    sqlStmt=`SELECT * FROM category WHERE id="${payload.id}"`
    try{
        console.log(sqlStmt);
        const result=await db.query(sqlStmt);
        return { status:200,response:result,error:null}
    }catch(err){
        return { status:500,response:null,error:err}
    }
}

async function updateCategory(payload){
    sqlStmt=`UPDATE category SET category_name="${payload.categoryname}",narration="${payload.narration}", updated_at=now() WHERE id="${payload.id}"`;
    try{
        console.log(sqlStmt);
        const result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    } 
}

async function deleteCategory(payload){
    let sqlStmt=`DELETE FROM category WHERE id="${payload.id}"`;
    try{
        console.log(sqlStmt);
        const result=await db.query(sqlStmt);
        return {status:200,response:result,error:null}
    }catch(err){
        return {status:500,response:null,error:err}
    }
}