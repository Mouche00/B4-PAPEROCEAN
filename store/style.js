let popupbook = document.getElementById("popupbook");
const cart = document.getElementById("cart");
cart.addEventListener("click",() =>{
    popupbook.classList.remove("scale-0");
    popupbook.classList.add("scale-150 ");
    
})
let popup = document.getElementById("popup");
const panier = document.getElementById("panier");
panier.addEventListener("click",() =>{
    popup.classList.remove("scale-0");
    popup.classList.add("sclale-150 ");
})
    



const recommendedSection = document.getElementById("recommended");
const popularSection = document.getElementById("popular");
const newlyReleasedSection = document.getElementById("newly-released");
const allBooksSection = document.getElementById("all-books");

// Get navigation buttons
const btnRecommended = document.getElementById("btnRecommended");
const btnPopular = document.getElementById("btnPopular");
const btnNewlyReleased = document.getElementById("btnNewlyReleased");
const btnAllBooks = document.getElementById("btnAllBooks");

// Scroll to the corresponding section when a button is clicked
btnRecommended.addEventListener("click", () => {
    recommendedSection.scrollIntoView({ behavior: "smooth" });
});

btnPopular.addEventListener("click", () => {
    popularSection.scrollIntoView({ behavior: "smooth" });
});

btnNewlyReleased.addEventListener("click", () => {
    newlyReleasedSection.scrollIntoView({ behavior: "smooth" });
});

btnAllBooks.addEventListener("click", () => {
    allBooksSection.scrollIntoView({ behavior: "smooth" });
});




var swiper = new Swiper(".card_slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});