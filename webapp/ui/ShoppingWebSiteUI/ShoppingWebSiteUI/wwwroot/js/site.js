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