
let cart = [];

const products = document.querySelectorAll(".firstItem, .secondItem");

const cartOverlay = document.getElementById("cartOverlay");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

products.forEach(product => {
    const button = product.querySelector(".addToCartButton");

    button.addEventListener("click", () => {
        const name = product.querySelector(".productText").textContent;
        const priceText = product.querySelector(".price").textContent;
        const price = Number(priceText.replace("SEK", "").trim());
        const image = product.querySelector("img").getAttribute("src");

        cart.push({ name, price, image });

        updateCart();
    });
});

openCart.addEventListener("click", () => {
    cartOverlay.style.display = "flex";
});


closeCart.addEventListener("click", () => {
    cartOverlay.style.display = "none";
});


cartOverlay.addEventListener("click", event => {
    if (event.target === cartOverlay) {
        cartOverlay.style.display = "none";
    }
});


function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach((item, index) => {
        total += item.price;

        const product = document.createElement("div");
        product.className = "cartProduct";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const details = document.createElement("div");

        const name = document.createElement("p");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = item.price + " SEK";

        const removeButton = document.createElement("button");
        removeButton.className = "removeProduct";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
        });

        details.append(name, price, removeButton);
        product.append(image, details);
        cartItems.appendChild(product);
    });

    cartTotal.textContent = total;
}
