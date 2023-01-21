$(document).ready(init);

function init() {
    if(!validateToken()){
        location.href='/login'
        return;
    }
    getProductRequests()
}

function validateToken(){
    let accToken=localStorage.getItem('accessToken');
    if(!accToken){
     return false
    }else{
     console.log(accToken)
     let userInfo=localStorage.getItem('user');
     console.log(userInfo)
     userInfo=JSON.parse(userInfo);
     $('#username').html(userInfo.full_name)
     return true
    }
 }

function getProductRequests() {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/productRequests',
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('accessToken')
        },
        data: null,
        success: function (res) {
            if (res.status == 200) {
                loadProductRequests(res.response)
            } else {
                alert('Something went Wrong!!')
            }
        },
        error: function (options) {
            throw new Error(options)
        }
    })
}

function loadProductRequests(records) {
    console.log(records)
    let getProductRequestsElements = '';
    for (let i = 0; i < records.length; i++) {
        getProductRequestsElements += `<tr>
        <td>${records[i].id}</td>
        <td>${records[i].title}</td>
        <td>${records[i].requirement_description}</td>
        <td>${records[i].email}</td>
        <td>${records[i].contact_number}</td>
        <td>${records[i].creation_time}</td>
      </tr>`
    }
    $('#table_container').html(getProductRequestsElements)
}

function signOut(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user')
    location.href='/login'
}