let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick  = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll  = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

document.querySelector('#search-icon').onclick = () =>{
    document.querySelector('#search-form').classList.toggle('active');  
}

document.querySelector('#close').onclick = () =>{
    document.querySelector('#search-form').classList.remove('active');  
}

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
  });

  let reviews = [];

  // Handle the review form submission
  document.getElementById('reviewForm').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent page reload

      // Get review text and rating
      const reviewText = document.getElementById('reviewText').value;
      const rating = document.getElementById('rating').value;

      // Create a new review object
      const newReview = {
          text: reviewText,
          rating: rating,
          date: new Date().toLocaleString() // Timestamp
      };

      // Add the new review to the array
      reviews.push(newReview);

      // Clear the form
      document.getElementById('reviewText').value = '';
      document.getElementById('rating').value = '1';

      // Display the reviews
      displayReviews();
  });

  // Function to display reviews on the page
  function displayReviews() {
      const reviewsList = document.getElementById('reviewsList');
      reviewsList.innerHTML = ''; // Clear existing reviews

      reviews.forEach(function (review) {
          const reviewDiv = document.createElement('div');
          reviewDiv.classList.add('review');
          reviewDiv.innerHTML = `
              <p><strong>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</strong></p>
              <p>${review.text}</p>
              <small>Submitted on: ${review.date}</small>
          `;
          reviewsList.appendChild(reviewDiv);
      });
  }


    // Cart Data Structure
    let cart = [];

    // Function to Add to Cart
    function addToCart(itemName, itemPrice) {
        // Add item to cart array
        cart.push({ name: itemName, price: itemPrice });

        // Update Cart UI
        updateCart();
    }

    // Function to Update Cart UI
    function updateCart() {
        let cartList = document.getElementById("cart-items");
        let totalElement = document.getElementById("cart-total");
        let total = 0;

        // Clear previous items
        cartList.innerHTML = "";

        // Loop through cart and update UI
        cart.forEach((item, index) => {
            total += item.price;
            let listItem = document.createElement("li");
            listItem.innerHTML = `${item.name} - R${item.price} 
                <button onclick="removeFromCart(${index})" class="remove-btn">X</button>`;
            cartList.appendChild(listItem);
        });

        // Update total
        totalElement.innerText = `R${total}`;
    }

    // Function to Remove Item from Cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Function for Checkout
    document.getElementById("checkout-btn").addEventListener("click", () => {
        if (cart.length > 0) {
            alert("Proceeding to checkout! Your total is: R" + cart.reduce((sum, item) => sum + item.price, 0));
            cart = [];
            updateCart();
        } else {
            alert("Your cart is empty!");
        }
    });

    // Attach addToCart function to buttons
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function() {
            let itemName = this.parentElement.querySelector("h3").innerText;
            let itemPrice = parseFloat(this.parentElement.querySelector("span").innerText.replace("R", ""));
            addToCart(itemName, itemPrice);
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImg");
        const closeBtn = document.querySelector(".close-btn");
        const body = document.body;

        modal.style.display = "none";
    
        // Attach event listener to all eye icons
        document.querySelectorAll(".fa-eye").forEach(eyeIcon => {
            eyeIcon.addEventListener("click", function (event) {
                event.preventDefault();
                
                // Get the image inside the parent .box
                const img = this.parentElement.querySelector("img");
    
                if (img) {
                    modal.style.display = "flex";
                    modalImg.src = img.src;
    
                    // Add class to blur background
                    body.classList.add("modal-open");
                }
            });
        });
    
        // Close the modal when clicking outside the image or on the close button
        modal.addEventListener("click", function (event) {
            if (event.target === modal || event.target === closeBtn) {
                modal.style.display = "none";
                body.classList.remove("modal-open");
            }
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const favoriteContainer = document.querySelector(".favorite-container");
    
        // Handle clicking the heart icon
        document.querySelectorAll(".fa-heart").forEach(heartIcon => {
            heartIcon.addEventListener("click", function (event) {
                event.preventDefault();
                this.classList.toggle("favorited"); // Toggle red heart
    
                const box = this.closest(".box");
                const imgSrc = box.querySelector(".image img").src;
                const title = box.querySelector("h3").textContent;
                const price = box.querySelector(".price").textContent;
    
                if (this.classList.contains("favorited")) {
                    // Add to favorites
                    const favItem = document.createElement("div");
                    favItem.classList.add("favorite-item");
                    favItem.innerHTML = `
                        <img src="${imgSrc}" alt="${title}">
                        <h3>${title}</h3>
                        <span>${price}</span>
                        <button class="remove-favorite">Remove</button>
                    `;
                    favoriteContainer.appendChild(favItem);
    
                    // Remove from favorites when clicking "Remove"
                    favItem.querySelector(".remove-favorite").addEventListener("click", function () {
                        favItem.remove();
                        heartIcon.classList.remove("favorited"); // Reset heart icon
                        updateFavoriteCount(); // Update the count when an item is removed
                    });
                } else {
                    // Remove from favorites if clicked again
                    document.querySelectorAll(".favorite-item").forEach(favItem => {
                        if (favItem.querySelector("h3").textContent === title) {
                            favItem.remove();
                        }
                    });
                }
    
                // Update the favorite count whenever an item is added or removed
                updateFavoriteCount();
            });
        });
    });

