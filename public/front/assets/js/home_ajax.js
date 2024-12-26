//////////////////login ajax /////////////////////////////////////////////////
$('#loginForm').on('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = $('input[name="email"]').val();
    const password = $('input[name="password"]').val();

    try {
        const response = await $.ajax({
            url: '/check_user',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            dataType: 'json'
        });

        if (response.success) {
            // Save userId in sessionStorage
            sessionStorage.setItem('userId', response.userId);

            // Redirect to home page
            window.location.href = '/';
        } else {
            // Handle errors (wrong email/password)
            alert(response.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});
///////////////////////////////////sent cart data to server//////////////////////////////////
// Function to handle cart sync with server
function syncCartToServer() {
    const userId = sessionStorage.getItem('userId'); // Get user_id from sessionStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || []; // Get cart data from localStorage
  console.log('cart data',cartData)  
    // Check if the cart has items and if user is logged in
    if (!userId) {
        window.location.href = "/login";
        // Redirect to login if not logged in
        return;
    }

    if (cartData.length === 0) {
        alert("Your cart is empty.");
        return; // Exit function if cart is empty
    }

    // Send cart data to the server via AJAX
    $.ajax({
        url: '/save_cart',  // Server API endpoint
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            user_id: userId,
            cart_data: cartData
        }),
        success: function(response) {
          
            window.location.href = "/cart";
        },
        error: function(error) {
            console.error("Error syncing cart:", error);
            alert("Failed to sync cart. Please try again.");
        }
    });
}

// Event listener for cart button click
$(document).ready(function() {
    $('#cart-button').on('click', function(event) {
        event.preventDefault();  // Prevent default anchor behavior
        syncCartToServer();      // Call the function to sync cart data
    });
});
///////////////////////////////////////////////Order place ajax here/////////////////////////////////////////////
$(document).on('click', '#placeOrderBtn', async function () {
    // Get selected address ID
    console.log('code run after ordr place button')
    const selectedAddress = $('input[name="tt-radio"]:checked');
    const addressId = selectedAddress.data('address-id');
    // Get total amount
    const totalAmount = parseFloat($('#beforeTax').text());
  

    // Fetch user ID from sessionStorage
    const userId = sessionStorage.getItem('userId');

    // Collect product details (Product Data)
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    // Validate data
    if (!addressId || !cartData.length) {
        alert('Please select an address and ensure your cart is not empty.');
        return;
    }

    try {
        // Send data to the server
        const response = await $.ajax({
            url: '/place_order',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                user_id: userId,
                address_id: addressId,
                total_amount: totalAmount,
                cart_data: cartData,
            }),
        });

        if (response.success) {            
            localStorage.removeItem('cart'); // Clear the cart after successful order
            window.location.href = '/order_comfirm'; // Redirect to order success page
        } else {
            alert('Failed to place order. Please try again.');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('An error occurred. Please try again later.');
    }
});
