// -------------------------- GLOBAL ---------------------------------- //

const form = document.querySelector("#main-form");
const overlay =  document.querySelector("#overlay");

let uid;

overlay.addEventListener("click", () => {
    form.classList.add("hidden");
    overlay.classList.add("hidden");
});

const clearForm = () => {
    bId.value = "";
    cId.value = "";
    isbn.value = "";
    title.value = "";
    catName.value = "";
    bookDescription.value = "";
    catDescription.value = "";
    image.src = "";
}

window.addEventListener("load", () => {
    
    // book

    books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];

    books.forEach((book) => {
        createBook(book.id, book.isbn, book.title, book.description, book.category, book.author);
    });

    // cat

    cats = localStorage.getItem("cats")
    ? JSON.parse(localStorage.getItem("cats"))
    : [];

    cats.forEach((cat) => {
        createCat(cat.id, cat.name, cat.description);
    });

    // aut

    auts = localStorage.getItem("auts")
    ? JSON.parse(localStorage.getItem("auts"))
    : [];

    auts.forEach((aut) => {
        createAut(aut.id, aut.name, aut.genre);
    });

    popBookAut();
});

// ---------------------------------------------------------------------------------------------- BOOKS -------------------------------------------------------------------------------------- //

// books container
const booksWrapper = document.querySelector("#books-wrapper");
// books form inputs
const title = document.querySelector("#title");
const bId = document.querySelector("#book-id");
const isbn = document.querySelector("#isbn");
const bookDescription = document.querySelector("#book-description");
const bookCat = document.querySelector("#book-category");
const bookAut = document.querySelector("#book-author");
const bookImage = document.querySelector("#image");
const price = document.querySelector("#price");
const qty = document.querySelector("#quantity");
// mains
const mainBook = document.querySelector("#main-books");
// buttons
const submitBookForm = document.querySelector("#main-books-form-submit");
const saveBookForm = document.querySelector("#main-books-form-save");
const removeAllBooks = document.querySelector("#remove-books-btn");
const displayBookForm = document.querySelector("#display-book-form-btn");
// switchers
const bookSwitcher = document.querySelector("#books-btn");
// forms
const bookForm = document.querySelector("#book-form");
// misc
const image = document.querySelector("#test-image");
// regex
const regex = /^[+]?([.]\d+|\d+([.]\d+)?)$/;

let editInputs;
let books = [];

bookImage.addEventListener("change", function() {
    
    if (this.files && this.files[0]) {
        image.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
});

bookSwitcher.addEventListener("click", () => {
    bookSwitcher.parentNode.classList.add("active");
    autSwitcher.parentNode.classList.remove("active");
    catSwitcher.parentNode.classList.remove("active");
    mainBook.classList.remove("hidden");
    mainCat.classList.add("hidden");
    mainAut.classList.add("hidden");
    bookForm.classList.remove("hidden");
    catForm.classList.add("hidden");
    autForm.classList.add("hidden");
});


displayBookForm.addEventListener("click", () => {
    clearForm();
    form.classList.remove("hidden");
    overlay.classList.remove("hidden");
    submitBookForm.classList.remove("hidden");
    saveBookForm.classList.add("hidden");

    uid = new Date().getTime().toString();
    bId.placeholder = uid;
});

submitBookForm.addEventListener("click", (e) => {
    e.preventDefault();

    if(checkBook()){
        return;
    }

    addBook();

    form.classList.add("hidden");
    overlay.classList.add("hidden");
});

saveBookForm.addEventListener("click", (e) => {
    e.preventDefault();

    if (checkBookExecption()){
        if(checkBook()){
            return;
        }
    }

    let searchID = bId.placeholder;

    saveBook(searchID);

    form.classList.add("hidden");
    overlay.classList.add("hidden");

    
    resetBook(searchID);
});

removeAllBooks.addEventListener("click", () => {

    let confirmDelete = confirm("Are you sure you want to delete all the books?");

    if (!confirmDelete) {
      return;
    }
  
    books = [];
    localStorage.removeItem("books");

    while (booksWrapper.firstChild) {
        booksWrapper.removeChild(booksWrapper.lastChild);
    }
});

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

const searchBook = (searchID) => {

    let searchBook;

    books.forEach((book, i) => {
        if (searchID == book.id){
            searchBook = i;
        }
    });

    return searchBook;
}

const popBookCat = () => {

    
    bookCat.innerHTML = "";
    cats.forEach((cat) => {
        bookCat.innerHTML += `
        <option value="${cat.name}">${cat.name}</option>
        `;
    });
}

const popBookAut = () => {

    
    bookAut.innerHTML = "";
    auts.forEach((aut) => {
        bookAut.innerHTML += `
        <option value="${aut.name}">${aut.name}</option>
        `;
    });
}

const checkBook = () => {

    let checkFlag = 0;

    if (isbn.value.trim().length == 0 && !(isbn.style.display == "block")){
        alert("ERROR: Book title cannot be empty");
        checkFlag = 1;
    } else if (title.value.trim().length == 0 && !(title.style.display == "block")) {
        alert("ERROR: ISBN cannot be empty");
        checkFlag = 1;
    } else if (bookDescription.value.trim().length == 0 && !(bookDescription.style.display == "block")) {
        alert("ERROR: Book description cannot be empty");
        checkFlag = 1;
    } else if (bookCat.value.trim().length == 0 && !(bookCat.style.display == "block")) {
        alert("ERROR: Book category cannot be empty");
        checkFlag = 1;
    } else if (bookAut.value.trim().length == 0 && !(bookAut.style.display == "block")) {
        alert("ERROR: Book author cannot be empty");
        checkFlag = 1;
    } else if ((bookAut.value.trim().length == 0 || !regex.test(price.value)) && !(bookAut.style.display == "block")) {
        alert("ERROR: Book price cannot be empty or is not a positive number");
        checkFlag = 1;
    } else if ((bookAut.value.trim().length == 0 || !regex.test(qty.value)) && !(bookAut.style.display == "block")) {
        alert("ERROR: Book quantity cannot be empty or is not a positive number");
        checkFlag = 1;
    }

    books.forEach((book) => {
        
        if (isbn.value == book.isbn) {
            alert("ERROR: ISBN already exists");
            checkFlag = 1;
        } else if (title.value == book.title){
            alert("ERROR: Title already exists");
            checkFlag = 1;
        }
    });

    return checkFlag;
}

const checkBookExecption = () => {

    let checkFlag = 0;

    if (!(isbn.value == editInputs.isbn)){
        if(!(title.value == editInputs.title)){
            if (!(bookDescription.value == editInputs.description)) {
                checkFlag = 1;
            }
        } 
    }

    return checkFlag;
}


const addBook = () => {

    class BookObj {
        constructor() {
            this.id = uid;
            this.isbn = isbn.value;
            this.title = title.value;
            this.price = price.value;
            this.qty = qty.value;
            if (qty.value == 0){
                this.disp = 0;
            } else {
                this.disp = 1;
            }
            this.description = bookDescription.value;
            this.category = bookCat.value;
            this.author = bookAut.value;
            this.image = getBase64Image(image);
        }
    }

    const book = new BookObj();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));

    createBook(book.id, book.isbn, book.title, book.category, book.author);

}

const createBook = (id, isbn, title, description, category, author) => {
    const bookContainer = document.createElement("tr");
    bookContainer.id = id;
    bookContainer.innerHTML = `
        <td class="border-collapse border-2">${id}</th>
        <td class="border-collapse border-2">${isbn}</th> 
        <td class="border-collapse border-2">${title}</th>
        <td class="border-collapse border-2">${category}</th>
        <td class="border-collapse border-2">${author}</th>
        <td class="border-collapse border-2 flex place-content-end gap-1">
            <button type="button" id="book-edit-btn" class="bg-orange-500 text-neutral-50 rounded w-[50%] h-10" onclick="editBook(${id})">Edit</button>
            <button type="button" id="book-remove-btn" class="bg-red-700 text-neutral-50 rounded w-[50%] h-10" onclick="removeBookCheck(${id})">Delete</button>
        </td>
    `;

    booksWrapper.insertBefore(bookContainer, booksWrapper.firstChild);
}

const editBook = (searchID) => {

    form.classList.remove("hidden");
    overlay.classList.remove("hidden");

    books.forEach((book) => {

        if(searchID == book.id){

            bId.placeholder = book.id;
            isbn.value = book.isbn;
            title.value = book.title;
            bookDescription.value = book.description;
            bookCat.value = book.category;
            bookAut.value = book.author;
            price.value = book.price;
            qty.value = book.qty;

            editInputs = {
                id: bId.placeholder,
                isbn: isbn.value,
                title: title.value,
                description: bookDescription.value,
                category: bookCat.value,
                author: bookAut.value,
                price: price.value,
                qty: qty.value
            };
        }
    });

    submitBookForm.classList.add("hidden");
    saveBookForm.classList.remove("hidden");

}

const saveBook = (searchID) => {

    books.forEach((book) => {

        if(searchID == book.id){

            book.isbn = isbn.value;
            book.title = title.value;
            book.description = bookDescription.value;
            book.category = bookCat.value;
            book.author = bookAut.value;
            book.price = price.value;
            book.qty = qty.value;
            if (qty.value == 0){
                book.disp = 0;
            } else {
                book.disp = 1;
            }

        }
    })

    localStorage.setItem("books", JSON.stringify(books));

    

}

const removeBookCheck = (searchID) => {

    let confirmDelete = confirm("Are you sure you want to delete this book?");

    if (!confirmDelete) {
  
      return;
  
    }

    removeBook(searchID);

}

const removeBook = (searchID) => {

    const bookNode = document.getElementById(searchID);
    bookNode.parentNode.removeChild(bookNode);


    books = books.filter((book) => {

        return book.id != searchID;
    });

    localStorage.setItem("books", JSON.stringify(books));

}

const resetBook = (searchID) => {

    const bookNode = document.getElementById(searchID);
    bookNode.parentNode.removeChild(bookNode);

    let targetedBook;

    books.forEach((book) => {

        if(searchID == book.id){

            targetedBook = book;
        }
    });

    createBook(targetedBook.id, targetedBook.isbn, targetedBook.title, targetedBook.category, targetedBook.author);

}

// ---------------------------------------------------------------------------------------------- CATEGORIES -------------------------------------------------------------------------------------- //

// container
const catWrapper = document.querySelector("#cat-wrapper");

// inputs
const catName = document.querySelector("#cat-name");
const catDescription = document.querySelector("#cat-description");
const cId = document.querySelector("#cat-id");

// misc
const mainCat =  document.querySelector("#main-categories");
const catForm = document.querySelector("#category-form");

// buttons
const catSwitcher = document.querySelector("#cat-btn");
const displayCatForm = document.querySelector("#display-cat-form-btn");
const submitCatForm = document.querySelector("#main-cat-form-submit");
const saveCatForm = document.querySelector("#main-cat-form-save");
const removeAllCat = document.querySelector("#remove-all-cat-btn");

let cats = [];


catSwitcher.addEventListener("click", () => {
    bookSwitcher.parentNode.classList.remove("active");
    autSwitcher.parentNode.classList.remove("active");
    catSwitcher.parentNode.classList.add("active");
    mainBook.classList.add("hidden");
    mainAut.classList.add("hidden");
    mainCat.classList.remove("hidden");
    bookForm.classList.add("hidden");
    autForm.classList.add("hidden");
    catForm.classList.remove("hidden");
});

displayCatForm.addEventListener("click", () => {
    clearForm();
    form.classList.remove("hidden");
    overlay.classList.remove("hidden");
    submitBookForm.classList.remove("hidden");
    saveBookForm.classList.add("hidden");
    uid = new Date().getTime().toString();
    cId.placeholder = uid;
});

submitCatForm.addEventListener("click", (e) => {
    e.preventDefault();

    if(checkCat()){
        return;
    }

    addCat();

    form.classList.add("hidden");
    overlay.classList.add("hidden");
});

saveCatForm.addEventListener("click", (e) => {
    e.preventDefault();

    if (checkCatExecption()){
        if(checkCat()) {
            return;
        }
    }

    let searchID = cId.placeholder;

    saveCat(searchID);

    form.classList.add("hidden");
    overlay.classList.add("hidden");

    
    resetCat(searchID);
});

const checkCat = () => {

    let checkFlag = 0;

    if (catName.value.trim().length == 0 && !(catName.style.display == "block")){
        alert("ERROR: Category name cannot be empty");
        checkFlag = 1;
    } else if (catDescription.value.trim().length == 0 && !(catDescription.style.display == "block")) {
        alert("ERROR: Category description cannot be empty");
        checkFlag = 1;
    }

    cats.forEach((cat) => {
        
        if (catName.value == cat.name) {
            alert("ERROR: Category name already exists");
            checkFlag = 1;
        }
    });

    return checkFlag;
}

const checkCatExecption = () => {

    let checkFlag = 0;

    if(!(catName.value == editInputs.name)){
        if (!(catDescription.value == editInputs.description)) {
            checkFlag = 1;
        }
    }

    return checkFlag;
}

removeAllCat.addEventListener("click", () => {

    let confirmDelete = confirm("Are you sure you want to delete all the categories?");

    if (!confirmDelete) {
      return;
    }
  
    cats = [];
    localStorage.removeItem("cats");

    while (catWrapper.firstChild) {
        catWrapper.removeChild(catWrapper.lastChild);
    }

    books = [];
    localStorage.removeItem("books");

    while (booksWrapper.firstChild) {
        booksWrapper.removeChild(booksWrapper.lastChild);
    }

    popBookCat();
});


const addCat = () => {

    class CatObj {
        constructor() {
            this.id = uid;
            this.name = catName.value;
            this.description = catDescription.value;
        }
    }

    const cat = new CatObj();

    cats.push(cat);

    localStorage.setItem("cats", JSON.stringify(cats));

    createCat(cat.id, cat.name, cat.description);

}

const createCat = (id, name, description) => {
    const catContainer = document.createElement("tr");
    catContainer.id = id;
    catContainer.innerHTML = `
        <td class="border-collapse border-2">${id}</th>
        <td class="border-collapse border-2">${name}</th>
        <td class="border-collapse border-2">${description}</th>
        <td class="border-collapse border-2 flex place-content-end gap-1">
            <button type="button" id="book-edit-btn" class="bg-orange-500 text-neutral-50 rounded w-[50%] h-10" onclick="editCat(${id})">Edit</button>
            <button type="button" id="book-remove-btn" class="bg-red-700 text-neutral-50 rounded w-[50%] h-10" onclick="removeCat(${id})">Delete</button>
        </td>
    `;

    catWrapper.insertBefore(catContainer, catWrapper.firstChild);

    
    popBookCat();
}

const editCat = (searchID) => {

    form.classList.remove("hidden");
    overlay.classList.remove("hidden");

    cats.forEach((cat) => {

        if(searchID == cat.id){

            cId.placeholder = cat.id;
            catName.value = cat.name;
            catDescription.value = cat.description;

            editInputs = {
                id: cId.placeholder,
                name: catName.value,
                description: catDescription.value,
            };
        }
    });

    submitCatForm.classList.add("hidden");
    saveCatForm.classList.remove("hidden");

    popBookCat();

}

const saveCat = (searchID) => {

    cats.forEach((cat) => {

        if(searchID == cat.id){

            cat.name = catName.value;
            cat.description = catDescription.value;
        }
    })

    localStorage.setItem("cats", JSON.stringify(cats));

    

}

const searchCat = (searchID) => {

    let searchedCat;

    cats.forEach((cat, i) => {
        if (searchID == cat.id){
            searchedCat = i;
        }
    });

    return searchedCat;
}

const removeCat = (searchID) => {

    let confirmDelete = confirm("Are you sure you want to delete this category?");

    if (!confirmDelete) {
  
      return;
  
    }

    const catNode = document.getElementById(searchID);
    catNode.parentNode.removeChild(catNode);

    let searchCat1;
    searchCat1 = searchCat(searchID);
    
    // books.forEach((book, i) => {
    //     if (book.category == cats[searchCat1].name){
    //         removeBook(books[i].id);
    //     }
    // });

    for (let i = books.length - 1; i >= 0 ; i--){
        if (books[i].category == cats[searchCat1].name){
            removeBook(books[i].id);
        }
    }

    cats = cats.filter((cat) => {

        return cat.id != searchID;
    });

    localStorage.setItem("cats", JSON.stringify(cats));

    popBookCat();

}

const resetCat = (searchID) => {

    const catNode = document.getElementById(searchID);
    catNode.parentNode.removeChild(catNode);

    let targetedCat;

    cats.forEach((cat) => {

        if(searchID == cat.id){

            targetedCat = cat;
        }
    });

    createCat(targetedCat.id, targetedCat.name, targetedCat.description);

}



// ---------------------------------------------------------------------------------------------- AUTHORS -------------------------------------------------------------------------------------- //



// container
const autWrapper = document.querySelector("#aut-wrapper");

// inputs
const autName = document.querySelector("#aut-name");
const genre = document.querySelector("#author-genre");
const aId = document.querySelector("#aut-id");

// misc
const mainAut =  document.querySelector("#main-authors");
const autForm = document.querySelector("#author-form");

// buttons
const autSwitcher = document.querySelector("#aut-btn");
const displayAutForm = document.querySelector("#display-aut-form-btn");
const submitAutForm = document.querySelector("#main-aut-form-submit");
const saveAutForm = document.querySelector("#main-aut-form-save");
const removeAllAut = document.querySelector("#remove-all-aut-btn");

let auts = [];


autSwitcher.addEventListener("click", () => {
    bookSwitcher.parentNode.classList.remove("active");
    autSwitcher.parentNode.classList.add("active");
    catSwitcher.parentNode.classList.remove("active");
    mainBook.classList.add("hidden");
    mainCat.classList.add("hidden");
    mainAut.classList.remove("hidden");
    bookForm.classList.add("hidden");
    catForm.classList.add("hidden");
    autForm.classList.remove("hidden");
});

displayAutForm.addEventListener("click", () => {
    clearForm();
    form.classList.remove("hidden");
    overlay.classList.remove("hidden");
    submitBookForm.classList.remove("hidden");
    saveBookForm.classList.add("hidden");
    uid = new Date().getTime().toString();
    aId.placeholder = uid;
});

submitAutForm.addEventListener("click", (e) => {
    e.preventDefault();

    if(checkAut()){
        return;
    }

    addAut();

    form.classList.add("hidden");
    overlay.classList.add("hidden");
});

saveAutForm.addEventListener("click", (e) => {
    e.preventDefault();

    if (checkAutExecption()){
        if(checkAut()) {
            return;
        }
    }

    let searchID = aId.placeholder;

    saveAut(searchID);

    form.classList.add("hidden");
    overlay.classList.add("hidden");

    
    resetAut(searchID);
});

const checkAut = () => {

    let checkFlag = 0;

    if (autName.value.trim().length == 0 && !(autName.style.display == "block")){
        alert("ERROR: Author name cannot be empty");
        checkFlag = 1;
    } else if (genre.value.trim().length == 0 && !(genre.style.display == "block")) {
        alert("ERROR: Author genre cannot be empty");
        checkFlag = 1;
    }

    auts.forEach((aut) => {
        
        if (autName.value == aut.name) {
            alert("ERROR: Author name already exists");
            checkFlag = 1;
        }
    });

    return checkFlag;
}

const checkAutExecption = () => {

    let checkFlag = 0;

    if(!(autName.value == editInputs.name)){
            checkFlag = 1;
    }

    return checkFlag;
}

removeAllAut.addEventListener("click", () => {

    let confirmDelete = confirm("Are you sure you want to delete all the authors?");

    if (!confirmDelete) {
      return;
    }
  
    auts = [];
    localStorage.removeItem("auts");

    while (autWrapper.firstChild) {
        autWrapper.removeChild(autWrapper.lastChild);
    }

    auts = [];
    localStorage.removeItem("auts");

    while (autWrapper.firstChild) {
        autWrapper.removeChild(autWrapper.lastChild);
    }

    popBookAut();
});


const addAut = () => {

    class AutObj {
        constructor() {
            this.id = uid;
            this.name = autName.value;
            this.genre = genre.value;
        }
    }

    const aut = new AutObj();

    auts.push(aut);

    localStorage.setItem("auts", JSON.stringify(auts));

    createAut(aut.id, aut.name, aut.genre);

}

const createAut = (id, name, genre) => {
    const autContainer = document.createElement("tr");
    autContainer.id = id;
    autContainer.innerHTML = `
        <td class="border-collapse border-2">${id}</th>
        <td class="border-collapse border-2">${name}</th>
        <td class="border-collapse border-2">${genre}</th>
        <td class="border-collapse border-2 flex place-content-end gap-1">
            <button type="button" id="book-edit-btn" class="bg-orange-500 text-neutral-50 rounded w-[50%] h-10" onclick="editAut(${id})">Edit</button>
            <button type="button" id="book-remove-btn" class="bg-red-700 text-neutral-50 rounded w-[50%] h-10" onclick="removeAut(${id})">Delete</button>
        </td>
    `;

    autWrapper.insertBefore(autContainer, autWrapper.firstChild);

    
    popBookAut();
}

const editAut = (searchID) => {

    form.classList.remove("hidden");
    overlay.classList.remove("hidden");

    auts.forEach((aut) => {

        if(searchID == aut.id){

            aId.placeholder = aut.id;
            autName.value = aut.name;
            genre.value = aut.genre;

            editInputs = {
                id: cId.placeholder,
                name: autName.value,
                genre: genre.value,
            };
        }
    });

    submitAutForm.classList.add("hidden");
    saveAutForm.classList.remove("hidden");

    popBookAut();

}

const saveAut = (searchID) => {

    auts.forEach((aut) => {

        if(searchID == aut.id){

            aut.name = autName.value;
            aut.genre = genre.value;
        }
    })

    localStorage.setItem("auts", JSON.stringify(auts));

    

}

const searchAut = (searchID) => {

    let searchAut;

    auts.forEach((aut, i) => {
        if (searchID == aut.id){
            searchAut = i;
        }
    });

    return searchAut;
}

const removeAut = (searchID) => {

    let confirmDelete = confirm("Are you sure you want to delete this author?");

    if (!confirmDelete) {
  
      return;
  
    }

    const autNode = document.getElementById(searchID);
    autNode.parentNode.removeChild(autNode);

    auts = auts.filter((aut) => {

        return aut.id != searchID;
    });

    localStorage.setItem("auts", JSON.stringify(auts));

    popBookAut();

}

const resetAut = (searchID) => {

    const autNode = document.getElementById(searchID);
    autNode.parentNode.removeChild(autNode);

    let targetedAut;

    auts.forEach((aut) => {

        if(searchID == aut.id){

            targetedAut = aut;
        }
    });

    createAut(targetedAut.id, targetedAut.name, targetedAut.genre);

}