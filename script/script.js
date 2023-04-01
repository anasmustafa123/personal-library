let library = [];

const cardsContainer = document.querySelector(".left-main");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const theStatus = document.getElementById("reading-status");
const submitForm = document.getElementById("add-new-book");

function Book(title, author, pages, theStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.theStatus = theStatus;
}

function addNewBook(e) {
  e.preventDefault();
  library.push(new Book(title.value, author.value, pages.value, theStatus.value));
  const newBook = document.createElement("div");
  newBook.classList.add("main-grid-item");
  newBook.setAttribute("id", `${library.length}`);
  const titleNode = document.createElement("div");
  const authorNode = document.createElement("div");
  const pagesNode = document.createElement("div");
  const statusNode = document.createElement("div");
  const removeButton = document.createElement("button");
  titleNode.classList.add("title");
  authorNode.classList.add("author");
  pagesNode.classList.add("pages");
  statusNode.classList.add("status");
  removeButton.classList.add("remove-card", "clickable");
  titleNode.textContent = title.value;
  authorNode.textContent = author.value;
  pagesNode.textContent = pages.value;
  statusNode.textContent = theStatus.value;
  removeButton.textContent = "remove";
  removeButton.addEventListener("click",(e) =>removeBook(e))
  newBook.appendChild(titleNode);
  newBook.appendChild(authorNode);
  newBook.appendChild(pagesNode);
  newBook.appendChild(statusNode);
  newBook.appendChild(removeButton);
  cardsContainer.appendChild(newBook);
  clearInputFields();
}
function clearInputFields() {
  for (let i = 0; i < submitForm.length-2;i++){
    submitForm.elements[i].value = "";
  }
}
function removeBook(e) {
  e.target.parentNode.remove();
}

submitForm.addEventListener("submit", (e) => addNewBook(e));
