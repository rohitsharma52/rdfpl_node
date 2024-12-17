///////////// get varient for each product id ///////////////////////////
$(document).ready(function () {
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
  
            // Set the price and MRP based on the default selected variant (first one)
            $('#variant-price-' + productId).text(`₹${largestVariant.sell_price}`);
            $('#variant-mrp-' + productId).html(`<del>₹${largestVariant.mrp}</del>`);
  
            // Handle variant selection change
            dropdown.on('change', function () {
              const selectedVariantId = $(this).val();
              const selectedVariant = response.data.find(v => v._id === selectedVariantId);
  
              if (selectedVariant) {
                // Update the displayed price and MRP when a new variant is selected
                $('#variant-price-' + productId).text(`₹${selectedVariant.sell_price}`);
                $('#variant-mrp-' + productId).html(`<del>₹${selectedVariant.mrp}</del>`);
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
  });
  
  