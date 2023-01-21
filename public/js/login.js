$(document).ready(init)

validateInputs();
var errElement=$('#errorElement');
var successElement=$('#successElement');
function init(){
    $('#loginBtn').click(function(e){
        e.preventDefault();
        let props={
            email:$('#emailId').val(),
            password:$('#passId').val()
        }
        console.log(props)
        if(props.email!='' && props.password!=''){
               errElement.html('')
               processLogin(props)

        }else{
            errElement.html('All Fields Are Required');
            setTimeout(()=>{
                errElement.html('');
            },3000)
        }
    })
}


function validateInputs(){
    $('#emailId').on('keyup',function(evt){
        let email=evt.target.value;
        const isEmailvalid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email){
            $('#emailInputError').html('Enter Your Registered Email Address');
            setTimeout(()=>{
                $('#emailInputError').html('');
            },3000)
        }else if(isEmailvalid.test(email)){
            doesEmailExist({email},function(existEmail){
                if(existEmail){
                    $('#emailInputError').html('')
                }else{
                    $('#emailInputError').html('This Email is Not Exist')
                } 
            })
        }
    })
}

function doesEmailExist(props,callback){
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/api/emailExist',
        contentType:'application/x-www-form-urlencoded; charset=utf-8',
        data:props,
        dataType:'json',
        async:false,
        success:function(res){
            if(res.status==200){
               callback(false)
            }else if(res.status==403){
                callback(true)
            }else{
                alert('Something Went Wrong!!')
            }
        },
        error:function(options){
           throw new Error(options)
        }
    })
}


function processLogin(props){
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/api/userLogin',
        contentType:'application/x-www-form-urlencoded; charset=utf-8',
        data:props,
        dataType:'json',
        async:false,
        success:function(res){
            if(res.status==200){
                successElement.html('Login Successfull')
                localStorage.setItem('accessToken',res.response) //generate access token
                let userPayload=jwt_decode(localStorage.getItem('accessToken'))
                console.log(userPayload)
                let stringifyPayload=JSON.stringify(userPayload)
                console.log(stringifyPayload)
                localStorage.setItem('user',stringifyPayload)
                location.href='/admin/dashboard'
            }else{
                errElement.html('Invalid Credentials')
            }
        },
        error:function(error){
            console.log(error)
        }
    })
}