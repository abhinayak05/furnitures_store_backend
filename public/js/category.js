$(document).ready(init)
var currentCategoryId = null;
let categories = [];
function init() {
    if(!validateToken()){
        location.href='/login'
        return;
    }
    getCategories()
}

function validateToken(){
    let accToken=localStorage.getItem('accessToken');
    if(!accToken){
        return false;
    }else{
        let userInfo=localStorage.getItem('user');
        userInfo=JSON.parse(userInfo);
        $('#username').html(userInfo.full_name);
        return true;
    }
}

$('#saveBtn').click(function (evt) {
    let props = {
        categoryname: $('#categoryname').val(),
        narration: $('#desc').val()
    }
    console.log(props);

    if (currentCategoryId == null) {
        if (props.categoryname != '' && props.narration != '') {
            saveCategory(props)
        } else {
            alert('Please Fill all the Fields')
        }
    } else {
        props.id = currentCategoryId;
        updateCategory(props)
        currentCategoryId = null;
    }
})

function saveCategory(props) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/saveCategories',
        headers:{
            authorization:'Bearer '+ localStorage.getItem('accessToken')
        },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: props,
        success: function (res) {
            if (res.status == 200) {
                getCategories();
                $('#categoryname').val('');
                $('#desc').val('');
                $('#closeBtn').click();
            } else {
                alert('Something went Wrong!!')
            }
        },
        error: function (options) {
            throw new Error(options)
        }
    })
}

function updateCategory(props){
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/updateCategory',
        headers:{
            authorization:'Bearer '+ localStorage.getItem('accessToken')
        },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: props,
        success: function (res) {
            if (res.status == 200) {
                getCategories();
                $('#categoryname').val('');
                $('#desc').val('');
                $('#closeBtn').click();
            } else {
                alert('Something went Wrong!!')
            }
        },
        error: function (options) {
            throw new Error(options)
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

function loadCategories(records) {
    console.log(records)
    categories = records
    let categoryElements = '';
    for (let i = 0; i < records.length; i++) {
        categoryElements += generateCategoryElements(records[i], i)
    }
    $('#categoryModal').html(categoryElements)
    $('.editBtn').click(function (evt) {
        let currentID = $(this).attr('id')
        console.log(currentID)
        let editCategoryData = categories.find((item) => item.id == currentID)
        console.log(editCategoryData)
        currentCategoryId=currentID;
        $('#categoryname').val(editCategoryData.category_name);
        $('#desc').val(editCategoryData.narration);
    })
}

function generateCategoryElements(items, index) {
    return `<tr>
    <td>${index + 1}</td>
    <td>${items.category_name}</td>
    <td>${items.narration}</td>
    <td class="d-flex"><button class="btn btn-sm btn-success editBtn" id="${items.id}" mr-3" data-toggle="modal" data-target="#categoryModalCard"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="btn btn-sm btn-danger" onclick="deleteBtn(${items.id})"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`
}

function deleteBtn(dlt_id){
    let props={
        id:dlt_id
    }
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/deleteCategory',
        headers:{
            authorization:'Bearer '+ localStorage.getItem('accessToken')
        },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: props,
        async: false,
        dataType: 'json',
        success: function (res) {
            if (res.status == 200) {
                getCategories()
            } else {
                alert('Something Went Wrong!!')
            }
        },
        error: function (options) {
            throw new Error(options)
        }
    })
}