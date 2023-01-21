var baseUrl = window.location.origin;
var accToken;
accToken = window.sessionStorage.accessToken;
var loader = document.getElementById("loader");
var mainContainer = document.getElementById("mainContainer")
if(loader){
 loader.style.display = "none";
}
var lib = {};



lib.request = function(urlMethods, data ,callback){


     var success = true, errorMsg = null;
     
    
        $.ajax({
            url: urlMethods.url,
            type: urlMethods.method,
            context: this,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            data: data,
           success: function (response) {
           
           		callback(response);
           		
            },
            error: function (response) {
                success = false;
                errorMsg = response;
                var options = {
                    status:400,
                    response:null,
                    error: response,
                 };
                 callback(options);
                throw new Error(response);
            }
        });
        
        return {
            success: success
            , data: data
            , errorMsg: errorMsg
        };
}

lib.sRequest = function(urlMethods, data){


    var success = true, errorMsg = null, res;
    
   
       $.ajax({
           url: urlMethods.url,
           type: urlMethods.method,
           context: this,
           contentType: "application/x-www-form-urlencoded; charset=utf-8",
           dataType: "json",
           async: false,
           data: data,
          success: function (response) {
                
                  res = response;
                  
           },
           error: function (response) {
               success = false;
               errorMsg = response;
               var options = {
                   status:400,
                   response:null,
                   error: response,
                };
                return options;
               throw new Error(response);
           }
       });
       
       return {
           success: success
           , data: res
           , errorMsg: errorMsg
       };
}




lib.authRequest = function (urlMethods, data, callback){
 var success = true, errorMsg = null, auth_token;
    
        //  authToken = window.sessionStorage.access_token;
        let authToken = window.localStorage.getItem('access_token')
   if(authToken){
    
        $.ajax({
            url: urlMethods.url,
            type: urlMethods.method,
            context: this,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            async: false,
            data: data,
            beforeSend : function( xhr ) {
               xhr.setRequestHeader( 'x-auth-token', `Bearer ${authToken}`);
            },
 
           success: function (response) {
                callback(response);
           
            },
            error: function (response) {
                success = false;
                errorMsg = response;
                callback(response);
                throw new Error(response);
            }
        });
        
        return {
            success: success
            , data: this.data
            , errorMsg: errorMsg
        };
}else{
   // window.location = `${baseUrl}/login`;
}



}


lib.sAuthRequest = function (urlMethods, data){
    var success = true, errorMsg = null, auth_token, res ={};
       
            authToken = window.sessionStorage.access_token;
       
      if(authToken){
       
           $.ajax({
               url: urlMethods.url,
               type: urlMethods.method,
               context: this,
               contentType: "application/x-www-form-urlencoded; charset=utf-8",
               dataType: "json",
               async: false,
               data: data,
               beforeSend : function( xhr ) {
                  xhr.setRequestHeader( 'Authorization', `Bearer ${authToken}`);
               },
    
              success: function (response) {
                  
                   res = response;
                   
              
               },
               error: function (response) {
                   success = false;
                   errorMsg = response;
                   res = response;
                //    return response;
                   throw new Error(response);
               }
           });
        //    console.log(this.response);
           return res;
        //    return {
        //        success: success
        //        , data: this.data
        //        , errorMsg: errorMsg
        //    };
   }else{
      // window.location = `${baseUrl}/login`;
   }
  
}

lib.uploadFile = function (urlMethods=null, data, callback){


 
    var formData = new FormData();
  formData.append("file",data);

 $.ajax({
    url: `${baseUrl}/api/upload`,
    method: 'POST',
     type: 'POST',
    enctype: 'multipart/form-data',
   data: formData,
  // headers: authHeaders,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function (returndata) {
      callback(returndata);
      console.log(returndata);
      //alert("file uploaded successfully!!!");
    }
  });
}


lib.sUploadFile = function (urlMethods=null, data){


    var res ={};
    var formData = new FormData();
  formData.append("file",data);

 $.ajax({
    url: `${baseUrl}/upload`,
    method: 'POST',
     type: 'POST',
    enctype: 'multipart/form-data',
   data: formData,
  // headers: authHeaders,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function (returndata) {
      res = returndata;
        //   sconsole.log(returndata);
        //alert("file uploaded successfully!!!");
    }
  });
  return res;

}




// @TODO Logout Function
lib.requestLogout = (urlMethods, data ,callback) => {
    
    var success = true, errorMsg = null;

    lib.authRequest(urlMethods, data, (res)=>{
        window.sessionStorage.access_token = "";
        callback(res);
    });
        
}


setGlobalValue = (key, value)=>{
    window.sessionStorage[key] = value;
}

getGlobalValue = (key)=>{
    return window.sessionStorage[key];
}

redirectTo = (router, auth = 0)=>{
    //mainContainer.style.display = "none";
    loader.style.display = "block";
    if(auth == 0){
         window.location = `${baseUrl}/${router}`;
    }else {
         window.location = `${baseUrl}/${router}?access_token=${accToken}`;

    }
}



$("#logoutBtn").click(()=>{
    var methodUrl = {
        url: `${baseUrl}/logout`,
        method:'POST'
    };


    var data = {};
    lib.requestLogout(methodUrl, data, (res)=>{
        if(res.success){
            window.location = `${baseUrl}/login`;
        
        }
    });
});

$("#logoutMobBtn").click(()=>{
    var methodUrl = {
        url: `${baseUrl}/logout`,
        method:'POST'
    };


    var data = {};
    lib.requestLogout(methodUrl, data, (res)=>{
        if(res.success){
            window.location = `${baseUrl}/login`;
        
        }
    });
});

lib.logout = function(){
    var methodUrl = {
        url: `${baseUrl}/logout`,
        method:'POST'
    };


    var data = {};
    lib.requestLogout(methodUrl, data, (res)=>{
        if(res.success){
            window.location = `${baseUrl}/vendor/login`;
        
        }
    });
}

signOut = function(){


   
    window.location = `${baseUrl}/login`;


}





lib._invokeLoader = function(_idone,_idtwo){
    document.querySelector('#'+_idone).style.display = 'inline';
    document.querySelector('#'+_idtwo).style.display = 'none';
}