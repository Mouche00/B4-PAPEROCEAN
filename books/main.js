const booksWrapper = document.getElementById("books-wrapper");

window.addEventListener("load", () => {
    
    // book

    books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];

    books.forEach((book, i) => {
        createBook(i, book.title, book.author, book.image);
    });
});




const createBook = (i, title, author, image) => {
    const bookContainer = document.createElement("div");
    const bookImage = document.createElement("img");
    bookImage.src = "data:image/png;base64," + image;
    bookContainer.classList.add("w-[100%]");
    bookContainer.id = i;
    bookContainer.append(bookImage);
    bookContainer.innerHTML += `
        <div class="mt-5 flex items-center place-content-between">
            <div class="bg-neutral-950 rotate-90 p-2 mt-5 ml-[-13px]">
                <p class="text-neutral-50">$18.99</p>
            </div>
            <div class="flex flex-col text-end">
                <p class="text-2xl font-medium">${title}</p>
                <p>${author}</p>
            </div>
        </div>
    `;

    booksWrapper.insertBefore(bookContainer, booksWrapper.firstChild);
}