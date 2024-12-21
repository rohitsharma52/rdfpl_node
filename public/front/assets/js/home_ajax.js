



$(document).ready(function () {
  
    // Function to update the cart count from localStorage
    function updateCartCountFromLocalStorage() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      updateCartCount(cart.length); // Update cart count dynamically
    }
  
    // Initial cart count update when page loads
    updateCartCountFromLocalStorage();
  
    // Loop through each product-variant-select dropdown
    $('.product-variant-select').each(function () {
      const productId = $(this).data('product-id'); // Get the product ID from the dropdown
      const dropdown = $(this); // Reference to the current dropdown
  
      // Make AJAX call to get variants for the product
      $.ajax({
          url: `/ajax/get_varient/${productId}`, // Dynamic URL based on product ID
          method: 'GET',
          dataType: 'json',
          success: function (response) {
              if (response.success && response.data.length > 0) {
                  dropdown.empty(); // Clear the dropdown options
  
                  // Set the largest variant as the default (first after sorting by price)
                  const largestVariant = response.data[0];
                  dropdown.append(
                      `<option value="${largestVariant._id}" selected>${largestVariant.pack_size} ${largestVariant.unit} - ₹${largestVariant.sell_price}</option>`
                  );
  
                  // Append remaining variants to the dropdown
                  response.data.slice(1).forEach(variant => {
                      dropdown.append(
                          `<option value="${variant._id}">${variant.pack_size} ${variant.unit} - ₹${variant.sell_price}</option>`
                      );
                  });
  
                  // Set the price and MRP based on the default selected variant
                  $(`#variant-price-${productId}`).text(`₹${largestVariant.sell_price}`);
                  $(`#variant-mrp-${productId}`).html(`<del>₹${largestVariant.mrp}</del>`);
  
                  // Default variant selection change logic
                  updateAddToCartButton(largestVariant);
  
                  // Handle variant selection change
                  dropdown.on('change', function () {
                      const selectedVariantId = $(this).val();
                      const selectedVariant = response.data.find(v => v._id === selectedVariantId);
  
                      if (selectedVariant) {
                          // Update the displayed price and MRP when a new variant is selected
                          $(`#variant-price-${productId}`).text(`₹${selectedVariant.sell_price}`);
                          $(`#variant-mrp-${productId}`).html(`<del>₹${selectedVariant.mrp}</del>`);
  
                          // Reset quantity to 1 when changing variant
                          $(`#quantity-${productId}`).val(1);
  
                          // Show the "Add to Cart" button again
                          updateAddToCartButton(selectedVariant);
                      }
                  });
  
              } else {
                  dropdown.html('<option value="default" selected>No Variants Available</option>');
              }
          },
          error: function (error) {
              console.error('Error fetching variants:', error);
              dropdown.html('<option value="default" selected>Error Loading Variants</option>');
          }
      });
    });
  
    // Function to update the "Add to Cart" button and hidden inputs
    function updateAddToCartButton(variant) {
        const productId = variant.product_id; // Assuming variant has product_id
        $(`#cart-actions-${productId}`).html(`
            <form class="add-to-cart-form">
                <input type="hidden" name="product_id" value="${productId}">
                <input type="hidden" name="variant_id" value="${variant._id}">
                <input type="hidden" name="quantity" value="1" id="quantity-${productId}">
                <button type="button" class="btn btn-secondary d-block btn-md rounded-1 add-to-cart-btn">Add to Cart</button>
            </form>
        `);
    }
  
    // Add product to cart (to localStorage)
    $(document).on('click', '.add-to-cart-btn', function () {
        const form = $(this).closest('form');
        const productId = form.find('input[name="product_id"]').val();
        const variantId = form.find('input[name="variant_id"]').val(); // Get selected variant ID
        const quantity = parseInt(form.find('input[name="quantity"]').val());
  
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
        // Check if the product already exists in cart
        let existingProduct = cart.find(item => item.product_id === productId && item.variant_id === variantId);
        if (existingProduct) {
            existingProduct.quantity += quantity; // Update quantity if product exists
        } else {
            cart.push({
                product_id: productId,
                variant_id: variantId,
                quantity: quantity
            });
        }
  
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
  
        // Update the cart UI
        addToCartDisplay(productId, variantId, quantity);
        updateCartCount(cart.length); // Update cart count dynamically
        callalert('Product Added Successfully');
    });
  
    // Function to add product to cart display
    function addToCartDisplay(productId, variantId, quantity) {
        $(`#cart-actions-${productId}`).html(`
            <div class="quantity-control d-flex align-items-center">
                <button class="btn btn-sm btn-danger decrease-qty" data-product-id="${productId}" data-variant-id="${variantId}">-</button>
                <span class="mx-2" id="quantity-display-${productId}">${quantity}</span>
                <button class="btn btn-sm btn-success increase-qty" data-product-id="${productId}" data-variant-id="${variantId}">+</button>
            </div>
        `);
    }
  
    // Handle quantity change
    $(document).on('click', '.decrease-qty, .increase-qty', function () {
        const isIncrease = $(this).hasClass('increase-qty');
        const productId = $(this).data('product-id');
        const variantId = $(this).data('variant-id');
  
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingProduct = cart.find(item => item.product_id === productId && item.variant_id === variantId);
  
        if (existingProduct) {
            existingProduct.quantity = isIncrease ? existingProduct.quantity + 1 : existingProduct.quantity - 1;
            if (existingProduct.quantity <= 0) {
                cart = cart.filter(item => !(item.product_id === productId && item.variant_id === variantId));
            }
  
            localStorage.setItem('cart', JSON.stringify(cart));
            callalert('Quantity Updated Successfully');
            const updatedQuantity = existingProduct.quantity || 0;
            $(`#quantity-display-${productId}`).text(updatedQuantity);
  
            // Update cart count
            updateCartCount(cart.length);
        }
    });
  
    // Function to update the cart count
    function updateCartCount(count) {
        $('#cart-count').text(count);
    }
  
    function callalert(message) {
      const alertHTML = `
        <div class="custom-alert">
            <span>${message}</span>
            <button type="button" class="btn-close" aria-label="Close">&times;</button>
        </div>
      `;
      
      // Append the alert to the custom alert container
      $('#custom-alert-container').append(alertHTML);
    
      // Close the alert when the close button is clicked
      $('.btn-close').on('click', function() {
        $(this).closest('.custom-alert').remove();
      });
    
      // Optionally, remove the alert after 5 seconds automatically
      setTimeout(function() {
        $('.custom-alert').remove();
      }, 5000);
    }
  });
  
///////////////////////////////////////User Login/////////////////////////////////////
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        const response = await fetch('/check_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();     
        if (data.success) {
            // Save userId in sessionStorage
            sessionStorage.setItem('userId', data.userId);

            // Redirect to home page
            window.location.href = '/';
        } else {
            // Handle errors (wrong email/password)
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});






//////////////////////sent localstorge data to server///////////////////////////
// Function to sync cart if user_id exists in sessionStorage and cart length >= 1

function syncCartIfValid() {
    const userId = sessionStorage.getItem('user_id'); // Get user_id from sessionStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || []; // Get cart data from localStorage

    // Validate user_id and cart length
    if (!userId) {
        console.log("User ID not found in sessionStorage. Skipping cart sync.");
        return; // Exit function if user_id is not found
    }

    if (cartData.length === 0) {
        console.log("Cart is empty. Skipping cart sync.");
        return; // Exit function if cart is empty
    }

    // Sync cart to server if both conditions are true
    $.ajax({
        url: '/cart/sync', // Server API endpoint
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            user_id: userId,
            products: cartData
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




