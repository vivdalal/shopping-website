// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function updateCart(element) {
    let productId = $(element).parent().attr('data-id');
    let quantity = Number($(element).siblings('.input-group').children('input').val());

    $.ajax('/Cart', {
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            productId: productId,
            quantity: quantity
        }),
        xhrFields: {
            withCredentials: true
        },
        success: function() {
            window.alert('Added to cart');    
        },
        failure: function() {
            window.alert('Something went wrong. Sorry try again!');
        }
    });
}

function checkoutCart(element) {
    let productId = $(element).parent().attr('data-id');
    let quantity = Number($(element).siblings('.input-group').children('input').val());

    $.ajax('/CheckCart', {
        method: 'get',
        contentType: 'application/json',
        data: JSON.stringify({
            productId: productId,
            quantity: quantity
        }),
        xhrFields: {
            withCredentials: true
        },
        success: function() {

            window.location.href = '/shoppingcart'; 
        },
        error: function() {
            window.alert('Please add items to cart!!');
        }
    });
}

function logout(element) {

    $.ajax('/Auth/Logout', {
        method: 'get',
        contentType: 'application/json',
        success: function() {
            window.location.href = '/auth/login';
        },
        failure: function() {
            window.alert('Something went wrong. Sorry try again!');
        }
    });
}

function cardSelected(card) {
    let cardNumber = $('#cardNumberField');
    let cardName = $('#cardNameField');
    let expiry = $('#monthField');
    let cvv = $('#cvvField');

    cardNumber.val(card.cardNo);
    cardName.val(card.cardName);
    expiry.val(card.expiry);
    cvv.val(card.cvv);
}