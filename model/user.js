
const backend=require('../backend/user')({});
const jwt=require('jsonwebtoken');
module.exports=(props)=>{
    return{
        saveUser,
        processLogin,
        emailExist,
    }
}

async function saveUser(req,res){
    let payload=req.body;
    let options=await backend.saveUser(payload);
    res.send(options)
}
async function emailExist(req,res){
    let payload=req.body;
    let options=await backend.getUserByEmail(payload);
    let emaillength=options.response.length;
    if(emaillength>0){
        console.log({status:403,response:'Email is Already Exist',error:'Access Denieded'});
        return res.send({status:403,response:'Email is Already Exist',error:'Access Denieded'});
    }
    return res.send(options)
}

async function processLogin(req,res){
    let payload=req.body;
    let emailResponse=await backend.verifyUserEmail(payload);
    if(emailResponse.status!=200){
        return res.status(emailResponse.status).send(emailResponse);
    }
    let options=await backend.verifyUserPassword(payload);
    if(options.status!=200){
        // return res.status(options.status).send(options);
        console.log({status:403,response:null,error:'Invalid Credentials'})
            return res.send({status:403,response:null,error:'Invalid Credentials'})
    }
    console.log(options.response[0])
    const user_id=options.response[0].id;
    const user_type=options.response[0].user_type;
    const accToken=generateAccessToken(options.response[0]);
    res.status(200).send({status:200,response:accToken,user_id,user_type,error:null})
}

function generateAccessToken(payload){
    let jwtPayload={
        id:payload.id,
        full_name:payload.full_name,
        user_type:payload.user_type,
        email:payload.email,
        phone:payload.phone
    }
    console.log(jwtPayload);
    var token=jwt.sign(jwtPayload,'mySecreteKey',{expiresIn:'1d'});
    return token
}