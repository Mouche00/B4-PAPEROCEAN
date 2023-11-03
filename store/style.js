// let popupbook = document.getElementById("popupbook");
// const cart = document.getElementById("cart");
// cart.addEventListener("click",() =>{
//     popupbook.classList.remove("scale-0");
//     popupbook.classList.add("scale-150 ");
    
// })
let popup = document.getElementById("popup");
const panier = document.getElementById("panier");
panier.addEventListener("click",() =>{
    popup.classList.remove("scale-0");
    popup.classList.add("sclale-150");
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
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // When window width is <= 768px (mobile view)
        768: {
            slidesPerView: 4,
        },
    },
})
const burgerBtn = document.getElementById("burger");
const mobileNav = document.getElementById("mobile-nav");








// -------------------------------------- DYNAMIC BOOKS ------------------------------------- //

const booksWrapper = document.getElementById("swiper-wrapper");
const body = document.querySelector("body");
const cartWrapper = document.querySelector("#cart-wrapper");
const cartTotal = document.querySelector("#cart-total");
let carts = [];
let popupContainer;

window.addEventListener("load", () => {
    
    // book

    books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];

    books.forEach((book, i) => {
        createBook(i, book.title, book.author, book.image, book.price);
    });

    carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [];

    carts.forEach((cart) => {
        createCart(cart.id, cart.title, cart.price, cart.qty);
    });

    calcTotal();
});




const createBook = (i, title, author, image, price) => {
    const bookContainer = document.createElement("div");
    let bookImage = "data:image/png;base64," + image;
    bookContainer.classList.add("swiper-slide");
    bookContainer.id = i;
    bookContainer.innerHTML += `
        <div class="book_box">
            <button type="button" onclick=showPopoutBook(${i}) id="cart"><img class="w-[280px] h-[420px] rounded cursor-pointer"
                    src="${bookImage}"></button>
            <div class="mt-5 flex items-center place-content-between  w-56">
                <div class="bg-neutral-950 rotate-90 p-2 mt-5 ml-[-13px]">
                    <p class="text-neutral-50">$<span>${price}</span</p>
                </div>
                <div class="flex flex-col text-end">
                    <p class="text-2xl font-medium">${title}</p>
                    <p>${author}</p>
                </div>
            </div>
        </div>
    `;

    booksWrapper.insertBefore(bookContainer, booksWrapper.firstChild);
}

const showPopoutBook = (i) => {
    bookPopout(i);

}
const hidePopout = (i) => {
    const close = document.getElementById(books[i].id);
    close.classList.add("scale-0");
    body.removeChild(popupContainer);
}

const bookPopout = (i) => {
    popupContainer = document.createElement("section");
    popupContainer.id = books[i].id;
    let bookImage = "data:image/png;base64," + books[i].image;
    popupContainer.innerHTML = `
    <div class="flex flex-row gap-10 mx-auto fixed top-32 left-60  z-10  justify-between p-10 items-center bg-white border border-gray-500 rounded-md max-w-screen-lg  transform scale-100  transition duration-700 ease-in-out" id="popupbook">
        <div class="flex flex-col gap-4">
            <img src="${bookImage}" alt="Book Cover" width="400" height="600">
            <button type="button" onclick=addToCart(${i}) class="w-56 py-2 px-4 bg-green-400 text-white rounded-md shadow-lg">Add To Cart</button>
        </div>

        <div>
            <h1 class="text-4xl font-bold">${books[i].title}</h1>
            <p class="text-base w-[80%]">${books[i].author}</p>

            <p class="text-sm mt-4">${books[i].description}</p><br>

            <div class="flex flex-row gap-4 mt-4">
            <div>
                <h5 class="text-xs">Price: </h5>
            </div>
                <div class="flex text-xs flex-row gap-2">
                    <p>$<span>${books[i].price}</span></p>
                </div>
            </div>

            <div class="flex flex-row gap-4 mt-4">
                <div>
                    <h5 class="text-xs">Genre: </h5>
                </div>
                <div class="flex text-xs flex-row gap-2">
                    <p>${books[i].category}</p>
                </div>
            </div>
            <p class="text-xs mt-4">374 pages, Hardcover</p>
            <p class="text-xs">First published September 14, 2008</p>
        </div>
        <div class="pb-96 cursor-pointe">
            <button type="button" onclick=hidePopout(${i}) id="cart"><img class=w-12 h-12 src="button ferme.png" alt=""></button>
        </div>
    </div>
    `;

    body.append(popupContainer);


}

const addToCart = (i) => {

    let exists = 0;

    carts.forEach((cart) => {
        if (books[i].id == cart.id){
            cart.qty++;
            let totalPrice = cart.price * cart.qty;

            const cartContainer = document.getElementById(books[i].id);
            cartContainer.innerHTML = "";
            cartContainer.innerHTML = `
            <div class="flex place-content-between w-48 text-sm border-2 border-black rounded w-52 bg-gray-200">
                <div>
                    <p class="mt-2">${books[i].title}</p>
                </div>
                <div>
                    <p id><span>$</span>${totalPrice}</p>
                    <p class="text-sm text-gray-400">${cart.qty}</p>
                </div>
            </div>
            `;

            exists = 1
        }
    });

    if (exists == 0){

        console.log("hello")
        const cartContainer = document.createElement("section");
        cartContainer.id = books[i].id;
        cartContainer.classList.add("scale-100");
        cartContainer.innerHTML = `
        <div class="flex place-content-between w-48 text-sm border-2 border-black rounded w-52 bg-gray-200" id="clearCartItem">
            <div>
                <button type="button" onclick=clearItem(${books[i].id})><p class="mt-2">${books[i].title}</p></button>
            </div>
            <div>
                <p id><span>$</span>${books[i].price}</p>
                <p class="text-sm text-gray-400">Qty:1</p>
            </div>
        </div>
        `;

        cartWrapper.insertBefore(cartContainer, cartWrapper.firstChild);

        carts.push(books[i]);
        carts.forEach((cart) => {
            if(cart.id == books[i].id){
                cart.qty = 1;
            }
        });

    }

    localStorage.setItem("carts", JSON.stringify(carts));

    calcTotal();

}

const clearItem = (searchId) => {
        carts = carts.filter((cart) => {
    
            return cart.id != searchId;
        });

        localStorage.setItem("carts", JSON.stringify(carts));

        cartWrapper.innerHTML = "";

        carts = carts.filter((cart) => {
    
            createCart(cart.id, cart.title, cart.price, cart.qty);
        });
    
}

const calcTotal = () => {
    let sum = 0;
    cartTotal.innerHTML = "";
    carts.forEach((cart) => {
        sum = sum + (cart.price * cart.qty);
        cartTotal.innerHTML = `${sum}`;
    });
}

const createCart = (id, title, price, qty) => {
    const cartContainer = document.createElement("section");
    cartContainer.id = id;
    cartContainer.innerHTML = `
    <div class="flex place-content-between w-48 text-sm border-2 border-black rounded w-52 bg-gray-200">
        <div>
        <button type="button" onclick=clearItem(${id})><p class="mt-2">${title}</p></button>
        </div>
        <div>
            <p id><span>$</span>${price * qty}</p>
            <p class="text-sm text-gray-400">${qty}</p>
        </div>
    </div>
    `;

    cartWrapper.insertBefore(cartContainer, cartWrapper.firstChild);
}