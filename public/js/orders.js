$(document).ready(init);

function init(){
    if(!validateToken()){
        location.href='/login'
        return;
    }
    getOrders();
}

function validateToken(){
    let accToken=localStorage.getItem('accessToken');
    if(!accToken){
        return false;
    }else{
        let userInfo=localStorage.getItem('user')
        userInfo=JSON.parse(userInfo)
        $('#username').html(userInfo.full_name)
        return true;
    }
}

function getOrders(){
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/api/getAllOrders',
        headers:{
            authorization:'Bearer '+ localStorage.getItem('accessToken')
        },
        data:null,
        success:function (res){
            if(res.status==200){
                loadAllOrders(res.response)
            }else{
                alert('Something Went Wrong!!')
            }
        },
        error:function (options){
            throw new Error(options)
        }
    })
}

function loadAllOrders(records){
    console.log(records)
    let getAllOrderElements='';
    for(let i=0;i<records.length;i++){
        getAllOrderElements+=generateOrdersElement(records[i],i)
    }
    $('#table_container').html(getAllOrderElements)
    $('.dropdown-menu a').on('click',function(evt){
        updateOrderStatus($(this).html(),$(this).attr('id'))
    })
}

function generateOrdersElement(items,index){
    return `<tr>
    <td>${items.order_id}</td>
    <td>${items.product_name}</td>
    <td>${items.product_price}</td>
    <td>${items.quantity}</td>
    <td>${items.total_price}</td>
    <td>${items.contact_number}</td>
    <td>${items.customer_address1}, ${items.customer_address2},${items.pincode}</td>
    <td>${items.delivery_status}</td>
    
    <td><div class="btn-group">
    <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Action
    </button>
    <div class="dropdown-menu">
      <a class="dropdown-item" id="${items.id}" href="#">Placed</a>
      <a class="dropdown-item" id="${items.id}" href="#">Cancelled</a>
      <a class="dropdown-item" id="${items.id}" href="#">Shipped</a>
      <a class="dropdown-item" id="${items.id}" href="#">Delivered</a>
    </div>
  </div></td>
  </tr>`
}
function updateOrderStatus(val,orderItemId){
    console.log(val)
    console.log(orderItemId)
    let props={
        id:orderItemId,
        deliveryStatus:val
    }
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/api/orders/updateStatus',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: props,
        async: false,
        dataType: 'json',
        headers:{
            authorization:'Bearer '+ localStorage.getItem('accessToken')
        },
        success:function(res){
            if(res.status==200){
                alert('Order Status Updated')
                getOrders()
            }else{
                alert('Something Went Wrong!!')
                console.log(res.error)
            }
        },
        error:function(options){
            throw new Error(options)
        }
    })
}