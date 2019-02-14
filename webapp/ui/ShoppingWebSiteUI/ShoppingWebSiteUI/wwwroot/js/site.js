// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function updateCart(event) {
    let productId = $(event.target).parent().attr('data-id');
    let quantity = $(event.target).sibling('input').val();

    $.ajax({
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            productId: productId,
            quantity: quantity,
        }),
        success: function() {
            window.alert('Added to cart');    
        },
        failure: function() {
            window.alert('Something went wrong. Sorry try again!');
        }
    });
}