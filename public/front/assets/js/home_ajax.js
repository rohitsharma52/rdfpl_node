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
function syncCartIfValid() {
   
    const userId = sessionStorage.getItem('userId'); // Get user_id from sessionStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || []; // Get cart data from localStorage

    // Validate user_id and cart length (both should be valid)
    if (!userId || cartData.length === 0) {
        // Agar userId nahi hai ya cart empty hai

        return; // Exit function if either condition is false
    }
    
    // Sync cart to server if both conditions are true
    $.ajax({
        url: '/save_cart', // Server API endpoint
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            user_id: userId,
            cart_data: cartData
        }),
        success: function (response) {
            console.log("Cart data successfully synced:", response);
            // Clear cart after successful sync
            localStorage.removeItem('cart');
        },
        error: function (error) {
            console.error("Error syncing cart data:", error);
        }
    });
}

$(document).ready(function() {
    
    console.log('Page loaded successfully!');
    syncCartIfValid()
   
});
