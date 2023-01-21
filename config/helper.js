var jwt = require('jsonwebtoken');
var multer = require('multer')
var path = require('path')
generateToken = function(payload){
    
    let objPayload = {
        id: payload.id,
        name: payload.full_name,
        email: payload.email,
        phone: payload.phone,
        user_type: payload.user_type
    }

    console.log(objPayload)
    var token = jwt.sign( objPayload, 'secret', {expiresIn: '1d'});
    return token
}

var storage =   multer.diskStorage({
    destination : function (req, file, callback) {
   // var sess = req.app.get('sess');
   // console.log("in storage  "+" the user session : " + sess.uid);
    console.log("file in dest : "+JSON.stringify(file));
    
       var type = file.mimetype.split('/');
       if(type[0] == "image")
         callback(null,path.join(__dirname,'../public/assets'));
      else if(type[0] == "text" || type[0] == "application")
         callback(null,path.join(__dirname,'../public/assets'));
       else if(type[0] == "audio")
        callback(null, path.join(__dirname,'../public/assets'));
       else if(type[0] == "video")
         callback(null, path.join(__dirname,'../public/assets'));	
   
    else
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    },
    filename: function (req, file, callback) {
        // var type = file.mimetype.split('/');
        
      var name = file.originalname.split('.');
      console.log("name is : "+file.originalname);
      ext = name[name.length-1];
          callback(null, file.fieldname + '-' + Date.now()+`.${ext}`);
      
     
    }
  });
  //var upload = multer({ dest : './public/uploads/images'});
  var uploadImage = multer({ storage : storage}).any();
  console.log(storage);
  //console.log(helper.upload);


  sendEmail = function(options){
    var nodemailer = require('nodemailer');
     var transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        // secure: true,
        port: 587,
        service: 'zoho',
        // service: 'gmail',
         auth: {
             user: 'info@clearstreamsolutions.in',
             pass: '7wLAvnzqrCqF'
            //  pass: 'QMtRa8UYVKTB'
         }
     });
    // options.user_name = "sirajmh.0111@gmail.com";
     let mailOptions = {
         from: 'info@clearstreamsolutions.in',
         to: options.email,
         subject: 'Order Confirmation',
         html: '<h1>'+ options.message+'</h1>',
     };
     console.log(mailOptions)
     transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
             console.log(error);
            // callback(options);
         } else {
             console.log('Email sent: ' + info.response);
         //    callback(options);
         }
     });
  }



module.exports = {
    generateToken,
    uploadImage,
    sendEmail
}

// let emailOptions = {
//     email: 'vencilaandrew@gmail.com',
//     message: 'Hi Vencila, Your order has been placed'
// }

// sendEmail(emailOptions);