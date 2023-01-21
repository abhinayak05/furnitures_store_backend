
$(document).ready(init);
var productImage = null;
var currentProductID = null;
let products=[]
function init() {
    if(!validateToken()){
        location.href='/login';
        return;
    }
    getCategories();
    getProducts();
}

function validateToken(){
    let accToken=localStorage.getItem('accessToken');
    if(!accToken){
        return false;
    }else{
        let userInfo=localStorage.getItem('user');
        userInfo=JSON.parse(userInfo);
        $('#username').html(userInfo.full_name)
        return true;
    }
}


$('#saveBtn').click(function (evt) {
        evt.preventDefault();
        let props = {
            categoryId: $('#categoryId').val(),
            productname: $('#productNameId').val(),
            price: $('#productPriceId').val(),
            quantity: $('#quantityId').val(),
            description: $('#productDescriptionId').val(),
            imageUrl: productImage
        }
        console.log(props)
        if (currentProductID == null) {
            if(props.categoryId!='' && props.productname!=''&&props.price!=''&&props.quantity!=''&&props.description!=''){
                if(!props.imageUrl){
                   return alert('Please Upload The Product Related File')
                }
                saveProducts(props)
            }else{
                alert('Please Fill all the Fields')
            }
        }else{
            props.id=currentProductID;
            updateProducts(props)
            currentProductID=null;
        }
    })

function saveProducts(props) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/saveProducts',
        headers:{
            authorization:'Bearer '+ localStorage.getItem('accessToken')
        },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: props,
        async: false,
        dataType: 'json',
        success: function (res) {
            if (res.status == 200) {
                getProducts();
                $('#productImageId').val('');
                $('#categoryId').val('Select Category');
                $('#productNameId').val('');
                $('#productPriceId').val('');
                $('#quantityId').val('');
                $('#productDescriptionId').val('');
                $('#closeBtn').click()
            }else{
                alert('Something Went wrong!!')
            }
        },
        error:function(options){
            throw new Error(options)
        }
    })
}

function updateProducts(props){
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/updateProducts',
        headers:{
            authorization:'Bearer '+ localStorage.getItem('accessToken')
        },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: props,
        async: false,
        dataType: 'json',
        success: function (res) {
            if (res.status == 200) {
                getProducts();
                $('#categoryId').val('Select Category');
                $('#productNameId').val('');
                $('#productPriceId').val('');
                $('#quantityId').val('');
                $('#productDescriptionId').val('');
                $('#closeBtn').click()
            }else{
                alert('Something Went wrong!!')
            }
        },
        error:function(options){
            throw new Error(options)
        }
    })
}

function uploadImage(evt) {
    let selectedFiles = evt.files[0]
    const formData = new FormData();
    formData.append('product', selectedFiles, selectedFiles.name);

    lib.uploadFile({ url: '/product' }, selectedFiles, function (res) {
        if (res.status == 200) {
            productImage = res.response.filename
        } else {
            productImage = null
            alert("Something is not right Try again")
            location.reload()
        }
    })
}

function getCategories() {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/getCategories',
        data: null,
        success: function (res) {
            if (res.status == 200) {
                loadCategories(res.response)
            } else {
                alert('Something Went Wrong!!')
            }
        },
        error: function (options) {
            throw new Error(options)
        }
    })
}

function loadCategories(categories) {
    console.log(categories)
    let categoryElements = '<option value="">Select Category</option>';
    for (let i = 0; i < categories.length; i++) {
        categoryElements += `
        <option value="${categories[i].id}">${categories[i].category_name}</option>
        `
    }
    $('#categoryId').html(categoryElements)
}

function getProducts() {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/getProducts',
        data: null,
        success: function (res) {
            if (res.status == 200) {
                loadAllProducts(res.response)
            } else {
                alert('Something Went Wrong!!')
            }
        },
        error: function (options) {
            throw new Error(options)
        }
    })
}

function loadAllProducts(records) {
    console.log(records)
    products=records;
    let getProducts = '';
    for (let i = 0; i < records.length; i++) {
        getProducts += generateProductsElement(records[i], i)
    }
    $('#product_container').html(getProducts)
    $('.editBtn').click(function(evt){
        let currentID=$(this).attr('id')
        console.log(currentID)
        let editProductData=products.find((Eitem)=>Eitem.id==currentID);
        console.log(editProductData)
        currentProductID=currentID;
        if(editProductData){
            $('#categoryId').val(editProductData.category_id);
            $('#productNameId').val(editProductData.product_name);
            $('#productPriceId').val(editProductData.product_price);
            $('#quantityId').val(editProductData.quantity);
            $('#productDescriptionId').val(editProductData.product_description)
            
        }
    })
}

function generateProductsElement(items, index) {
    return `<div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" height="210" src="${'/assets/' + items.image_url}" alt="Card image cap">
      <div class="card-body">
        <h3>${items.product_name}</h3>
        <p class="card-text">${items.product_description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="color-primary">Quantities:${items.quantity}</h6>
          <h6 class="color-primary">Price: ${items.product_price}/-</h6>
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-success editBtn" id="${items.id}" data-toggle="modal" data-target="#productModal"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="btn btn-sm btn-danger" onclick="deleteBtn(${items.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>`
}


function deleteBtn(dlt_id){
    let props={
        id:dlt_id
    }
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/deleteProducts',headers:{
            authorization:'Bearer '+ localStorage.getItem('accessToken')
        },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: props,
        async: false,
        dataType: 'json',
        success: function (res) {
            if (res.status == 200) {
                getProducts()
            } else {
                alert('Something Went Wrong!!')
            }
        },
        error: function (options) {
            throw new Error(options)
        }
    })
}