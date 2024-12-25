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
