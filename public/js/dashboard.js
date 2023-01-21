

$(document).ready(init);

function init(){
   if(!validateToken()){
    return;
   }
}

function validateToken(){
    let accToken=localStorage.getItem('accessToken');
    if(!accToken){
        return false
    }else{
        let userInfo=localStorage.getItem('user');
        userInfo=JSON.parse(userInfo)
        $('#username').html(userInfo.full_name)
    }
}

function signOut(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    location.href='/login';
}