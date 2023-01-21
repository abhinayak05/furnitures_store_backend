
const db=require('../helper/mySql');
const md5=require('md5');
module.exports = (props)=>{
     return{
        saveUser,
        verifyUserEmail,
        getUserByEmail,
        verifyUserPassword
     }
}

async function saveUser(payload){
    sqlStmt=`INSERT INTO users (full_name, email, password,gender, phone,dob,user_type) VALUES ("${payload.fullname}","${payload.email}", "${md5(payload.password)}","${payload.gender}", "${payload.phone}","${payload.dob}","${payload.user_type}")`;
    try{
        console.log(sqlStmt);
        const result=await db.query(sqlStmt);
        return{status:200,response:result,error:null}
    }catch(err){
        return{status:500,response:null,error:err}
    }
}

async function getUserByEmail(payload){
    sqlStmt=`Select email from users where email="${payload.email}"`;
    try{
        const result=await db.query(sqlStmt);
        console.log(sqlStmt);
        return{status:200,response:result,error:null}
    }catch(err){
        return{status:500,response:null,error:err}
    }
}


async function verifyUserEmail(payload){
    sqlStmt=`Select id,full_name,user_type,email from users where email="${payload.email}"`;
    try{
        const result=await db.query(sqlStmt);
        console.log(sqlStmt);
        console.log('resLength:',result.length)
        if(result.length==0){
            return{status:403,response:null,error:'This Email is Does not Exist'}
        }
        return{status:200,response:result,error:null}
    }catch(err){
        return{status:500,response:null,error:err}
    }
}

async function verifyUserPassword(payload){
    sqlStmt=`Select id,full_name,user_type,email,phone from users where email="${payload.email}" and password="${md5(payload.password)}"`;
    try{
        const result=await db.query(sqlStmt);
        console.log(sqlStmt);
        console.log('resLength:',result.length)
        if(result.length==0){
            return{status:403,response:null,error:'Invalid Credentils'}
        }
        return{status:200,response:result,error:null}
    }catch(err){
        return{status:500,response:null,error:err}
    }
}