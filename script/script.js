let library = [];
let statusOptions = ["to-read", "reading", "finished"];
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
function createNewElement(type, className, content) {
  const element = document.createElement(type);
  element.classList.add(className);
  element.textContent = content;
  return element;
}
function addNewBook(e) {
  e.preventDefault();
  library.push(
    new Book(title.value, author.value, pages.value, theStatus.value)
  );
  const newBook = createNewElement("div", "main-grid-item", "");
  newBook.setAttribute("id", `${library.length}`);
  const titleNode = createNewElement("div", "title", title.value);
  const authorNode = createNewElement("div", "author", author.value);
  const pagesNode = createNewElement("div", "pages", pages.value);
  const statusNode = createNewElement("button", "status", theStatus.value);
  const removeButton = createNewElement("button", "remove-card", "remove");
  newBook.setAttribute("status", statusOptions.indexOf(theStatus.value));
  statusNode.addEventListener("click", (e) => changeStatus(e));
  removeButton.addEventListener("click", (e) => removeBook(e));
  newBook.appendChild(titleNode);
  newBook.appendChild(authorNode);
  newBook.appendChild(pagesNode);
  newBook.appendChild(statusNode);
  newBook.appendChild(removeButton);
  cardsContainer.appendChild(newBook);
  clearInputFields();
}
function clearInputFields() {
  for (let i = 0; i < submitForm.length - 2; i++) {
    submitForm.elements[i].value = "";
  }
}
function removeBook(e) {
  e.target.parentNode.remove();
}
function changeStatus(e) {
  let next = (parseInt(e.target.parentNode.getAttribute("status")) + 1) % 3;
  e.target.parentNode.setAttribute("status", next);
  e.target.textContent = statusOptions[next]
}

submitForm.addEventListener("submit", (e) => addNewBook(e));
