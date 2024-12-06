$(document).ready(function () {

    // 1. Smooth transition for page load
    $('html').animate({ scrollTop: 0 }, 500);  // Scroll to top

    // 2. Rating Stars (Clickable Stars)
    $('.container').on('click', '.fa-star', function () {
        const stars = $(this).parent().find('.fa-star');
        const index = stars.index(this) + 1;

        // Reset all stars (make them gray)
        stars.removeClass('selected');
        
        // Highlight the selected stars (turn them yellow)
        for (let i = 0; i < index; i++) {
            $(stars[i]).addClass('selected');
        }
    });

    // 3. Add Item to Cart
    let cart = [];
    $('.button').on('click', function (e) {
        e.preventDefault();

        const itemName = $(this).closest('.box').find('h3').text();
        const itemPrice = $(this).closest('.box').find('h4').text();
        const itemRating = $(this).closest('.box').find('.container .fa-star.selected').length;

        // Add item to cart array
        const item = {
            name: itemName,
            price: itemPrice,
            rating: itemRating
        };
        cart.push(item);

        // Animate item being added to cart
        $(this).closest('.box').find('h3').addClass('added-to-cart');
        setTimeout(() => {
            $(this).closest('.box').find('h3').removeClass('added-to-cart');
        }, 1000);

        // Show message
        alert(`"${itemName}" has been added to your cart.`);
    });

    // 4. View Cart and Show Cart Details in Modal
    $('#view-cart').on('click', function () {
        let cartDetails = '';
        let totalPrice = 0;

        // Loop through cart to display all items
        cart.forEach(item => {
            cartDetails += `<p><strong>${item.name}</strong> - ${item.price} (Rating: ${item.rating} stars)</p>`;
            totalPrice += parseFloat(item.price.replace('$', ''));
        });

        // Append cart details to the modal
        cartDetails += `<p><strong>Total Price: $${totalPrice.toFixed(2)}</strong></p>`;

        // Append the customer details form to the modal
        const orderForm = `
            <form id="order-form">
                <input type="text" id="name" placeholder="Your Name" required>
                <input type="email" id="email" placeholder="Your Email" required>
                <input type="tel" id="phone" placeholder="Your Phone Number" required>
                <input type="text" id="address" placeholder="Your Address" required>
                <input type="time" id="order-time" required>
                <button type="submit">Confirm Order</button>
            </form>
        `;

        // Append the cart and form to the modal
        $('#cart-details').html(cartDetails + orderForm);
        $('#cart-modal').fadeIn(500); // Show modal with fade-in animation
    });

    // 5. Close Cart Modal
    $('#cart-modal .close').on('click', function () {
        $('#cart-modal').fadeOut(500); // Hide cart modal with fade-out animation
    });

    // 6. Contact Form Validation with Shaking Animation on Error
    $('#contact-form button').on('click', function (e) {
        e.preventDefault();

        const name = $('#contact-form input[placeholder="Your Name"]').val();
        const email = $('#contact-form input[placeholder="Your Email"]').val();
        const message = $('#contact-form textarea').val();

        // Check if all fields are filled
        if (!name || !email || !message) {
            alert('All fields are required!');
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#contact-form input[placeholder="Your Email"]').addClass('shake');
            alert('Please enter a valid email address!');
            setTimeout(() => {
                $('#contact-form input[placeholder="Your Email"]').removeClass('shake');
            }, 1000); // Shake duration
            return;
        }

        alert('Thank you for your feedback!');
    });

    // 7. Reservation Form Validation with Shaking on Errors
    $('#reservation-form button').on('click', function (e) {
        e.preventDefault();

        const name = $('#reservation-form #name').val();
        const date = $('#reservation-form #date').val();
        const time = $('#reservation-form #time').val();
        const size = $('#reservation-form #size').val();

        // Check if all fields are filled
        if (!name || !date || !time || !size) {
            alert('All fields are required!');
            return;
        }

        alert('Thank you for booking with us!');
    });

    // 8. Shaking Effect for Invalid Fields
    $.fn.extend({
        shake: function (options) {
            var defaults = { distance: 10, times: 2, speed: 50 };
            var settings = $.extend({}, defaults, options);

            return this.each(function () {
                var $this = $(this);
                var originalPosition = $this.position().left;

                for (var i = 0; i < settings.times; i++) {
                    $this.animate({ left: originalPosition + settings.distance }, settings.speed)
                         .animate({ left: originalPosition - settings.distance }, settings.speed);
                }
                $this.animate({ left: originalPosition }, settings.speed);
            });
        }
    });

    // 9. Animating and Highlighting Input Fields (for Form Validation)
    $('input, textarea').on('focus', function () {
        $(this).siblings('label').addClass('focused');
    }).on('blur', function () {
        if ($(this).val() === '') {
            $(this).siblings('label').removeClass('focused');
        }
    });
    $('#back-to-home').on('click', function () {
        // Close the cart modal
        $('#cart-modal').fadeOut(500);
    
        // Scroll back to the top (home section) or you can change it to a specific section
        $('html, body').animate({ scrollTop: 0 }, 1000); // Scroll to the top
    });
});
