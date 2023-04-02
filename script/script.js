let library = [];
let statusOptions = ["to-read", "reading", "finished"];
var searchedBook = {
  active: 0,
  book: undefined,
};

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}
const submitButton = document.getElementById("add-book-button");
const editButton = document.querySelector(".edit-button");
const searchButton = document.querySelector(".search-img-container");
const submitForm = document.getElementById("add-new-book");
const openInputModelButtons = document.querySelectorAll("[data-model-target]");
const closeInputModelButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

function addBookToLibrary(title, author, pages, status) {
  if (searchedBook.active == 1) {
    searchedBook.book.title = title;
    searchedBook.book.author = author;
    searchedBook.book.pages = pages;
    searchedBook.book.status = status;
    removeSearchedBook();
  } else {
    library.push(new Book(title, author, pages, status));
  }
}
function displayAllBooks() {
  const cardsContainer = document.querySelector(".left-main");
  cardsContainer.innerHTML = "";
  library.forEach((book) => {
    var newBook = createNewElement("div", "main-grid-item", "");
    newBook.setAttribute("data-id", `${library.indexOf(book)}`);
    const titleNode = createNewElement("div", "title", book.title);
    const authorNode = createNewElement("div", "author", book.author);
    const pagesNode = createNewElement("div", "pages", book.pages);
    const statusNode = createNewElement("button", "status", book.status);
    const removeButton = createNewElement("button", "remove-card", "remove");
    newBook.setAttribute("status", statusOptions.indexOf(book.status));
    statusNode.addEventListener("click", (e) => {
      changeStatus(e);
      displayAllBooks();
    });
    removeButton.addEventListener("click", (e) => {
      removeBook(e);
      displayAllBooks();
    });
    newBook.appendChild(titleNode);
    newBook.appendChild(authorNode);
    newBook.appendChild(pagesNode);
    newBook.appendChild(statusNode);
    newBook.appendChild(removeButton);
    cardsContainer.appendChild(newBook);
  });
}
function createNewElement(type, className, content) {
  const element = document.createElement(type);
  element.classList.add(className);
  element.textContent = content;
  return element;
}

submitForm.addEventListener("submit", (e) => {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const status = document.getElementById("reading-status");
  e.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, status.value);
  clearInputFields();
  displayAllBooks();
});

searchButton.addEventListener("click", () => search());

editButton.addEventListener("click", () => editCard());

function search() {
  const searchInput = document.querySelector("input.search");
  const searchTitle = searchInput.value;
  let books = library.filter(
    (book) => book.title.toLowerCase() == searchTitle.toLowerCase()
  );
  if (books.length != 0) {
    const card = document.querySelector(
      `[data-id= "${library.indexOf(books[0])}"]`
    );
    if (card) {
      card.classList.add("selected");
    }
    searchedBook.book = books[0];
  }
}

function changeStatus(e) {
  let index = parseInt(e.target.parentNode.getAttribute("data-id"));
  const card = e.target.closest(".main-grid-item");
  let next = (parseInt(card.getAttribute("status")) + 1) % 3;
  library[index].status = statusOptions[next];
  card.setAttribute("status", next);
}

function removeBook(e) {
  library.splice(
    parseInt(e.target.closest(".main-grid-item").getAttribute("data-id")),
    1
  );
}

function clearInputFields() {
  for (let i = 0; i < submitForm.length - 1; i++) {
    submitForm.elements[i].value = "";
  }
}
function removeSearchedBook() {
  searchedBook.book = undefined;
}
function editCard() {
  if (searchedBook.book != undefined) {
    searchedBook.active = 1;
    console.log("actually entered");
    moveDataToInputField(searchedBook.book);
  }
}
function moveDataToInputField(book) {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const status = document.getElementById("reading-status");
  title.value = book.title;
  author.value = book.author;
  pages.value = book.pages;
  status.value = book.status;
}

overlay.addEventListener("click", () => {
  const inputModels = document.querySelectorAll(".input-model.active");
  inputModels.forEach((inputModel) => {
    closeModel(inputModel);
  });
});

openInputModelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const inputModel = document.querySelector(button.dataset.modelTarget);
    openModel(inputModel);
  });
});

closeInputModelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const inputModel = button.closest(".input-model.active");
    closeModel(inputModel);
  });
});

function openModel(model) {
  if (model == null) return;
  model.classList.add("active");
  overlay.classList.add("active");
}
function closeModel(model) {
  if (model == null) return;
  model.classList.remove("active");
  overlay.classList.remove("active");
}
