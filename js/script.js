document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("ecolandCart")) || [];

    const cartButton = document.getElementById("cartButton");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");
    const clearCart = document.getElementById("clearCart");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");



    function updateCart() {

        cartItems.innerHTML = "";

        let total = 0;
        let quantity = 0;


        if (cart.length === 0) {

            cartItems.innerHTML =
                "<p>Your cart is empty.</p>";

        }


        cart.forEach(function (item) {

            let subtotal =
                item.price * item.quantity;

            total += subtotal;

            quantity += item.quantity;


            const itemDiv =
                document.createElement("div");

            itemDiv.className = "cart-item";


            itemDiv.innerHTML = `
                <h3>${item.name}</h3>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <p>
                    Price: ₦${item.price.toLocaleString()}
                </p>

                <p>
                    Subtotal: ₦${subtotal.toLocaleString()}
                </p>
            `;


            cartItems.appendChild(itemDiv);

        });


        cartCount.textContent = quantity;

        cartTotal.textContent =
            "₦" + total.toLocaleString();


        localStorage.setItem(
            "ecolandCart",
            JSON.stringify(cart)
        );

    }



    /* ADD TO CART */

    const buttons =
        document.querySelectorAll(".add-to-cart");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.getAttribute("data-name");

            const price =
                Number(button.getAttribute("data-price"));


            const existing =
                cart.find(function (item) {

                    return item.name === name;

                });


            if (existing) {

                existing.quantity++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            updateCart();


            button.textContent = "Added ✓";


            setTimeout(function () {

                button.textContent = "Add to Cart";

            }, 1000);

        });

    });



    /* OPEN CART */

    cartButton.addEventListener("click", function () {

        cartPanel.classList.add("open");

        updateCart();

    });



    /* CLOSE CART */

    closeCart.addEventListener("click", function () {

        cartPanel.classList.remove("open");

    });



    /* CLEAR CART */

    clearCart.addEventListener("click", function () {

        cart = [];

        localStorage.removeItem("ecolandCart");

        updateCart();

    });



    updateCart();

});

// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const formMessage = document.getElementById("formMessage");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        formMessage.textContent = "Message sent successfully! ✓";
        formMessage.style.color = "seagreen";

        contactForm.reset();

    });

}

// DISCOVER MORE BUTTON
const discoverButton = document.getElementById("discoverButton");

if (discoverButton) {
    discoverButton.addEventListener("click", function () {
        window.location.href = "about.html";
    });
}