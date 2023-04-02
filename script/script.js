let library = [];
let statusOptions = ["to-read", "reading", "finished"];
let selectedCards = []
const cardsContainer = document.querySelector(".left-main");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const theStatus = document.getElementById("reading-status");
const submitForm = document.getElementById("add-new-book");
const searchButton = document.querySelector(".search-img-container");
const searchField = document.querySelector("input.search");
const editButton = document.querySelector(".edit-button");
function Book(title, author, pages, theStatus,cardNode) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.theStatus = theStatus;
  this.cardNode = cardNode
}
function createNewElement(type, className, content) {
  const element = document.createElement(type);
  element.classList.add(className);
  element.textContent = content;
  return element;
}
function addNewBook(e) {
  e.preventDefault();
  let newBook = createNewElement("div", "main-grid-item", "");
  let tempBook = search(title.value);
  if(tempBook != undefined){
    removeBook(tempBook.cardNode);
  }
  newBook.setAttribute("id", `${library.length}`);
  library.push(
    new Book(title.value, author.value, pages.value, theStatus.value,newBook)
  );
  const titleNode = createNewElement("div", "title", title.value);
  const authorNode = createNewElement("div", "author", author.value);
  const pagesNode = createNewElement("div", "pages", pages.value);
  const statusNode = createNewElement("button", "status", theStatus.value);
  const removeButton = createNewElement("button", "remove-card", "remove");
  newBook.setAttribute("status", statusOptions.indexOf(theStatus.value));
  statusNode.addEventListener("click", (e) => changeStatus(e));
  removeButton.addEventListener("click", (e) => removeBook(e.target.parentNode));
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
function removeBook(card) {
  card.remove();
  console.log(library.filter((temp) => temp.cardNode == card))
  library.splice(library.indexOf(library.filter((temp) => temp.cardNode == card)), 1);
}
function changeStatus(e) {
  let next = (parseInt(e.target.parentNode.getAttribute("status")) + 1) % 3;
  e.target.parentNode.setAttribute("status", next);
  e.target.textContent = statusOptions[next]
}
function select(){
  let element = search();
  if(selectedCards.length != 0){
    console.log("element removed from the list")
    removeSelectedCard();
  }
  else{
    console.log("you don't have a previous search")
  }
  console.log(element)
  if(element == undefined){
    console.log("element was not found")
  }
  else{
    console.log("found");
    element.cardNode.classList.add('selected');
    selectedCards.push(element);
  }
}
function search(title){
  let temp = title;
  if(title == undefined){
   temp = searchField.value;
}
let elements = library.filter((card) => card.title.toLowerCase() == temp.toLowerCase())
return elements[0];
}
function removeSelectedCard(){
  selectedCards[0].cardNode.classList.remove('selected');
  selectedCards.pop();
}
function editCard(){
  if(selectedCards.length != 0){
    moveDataOf(selectedCards[0]);
    removeSelectedCard();
  }
}
function moveDataOf(card){
  console.log(card.title)
  console.log(card.author)
  console.log(card.pages)
  console.log(card.theStatus)
  title.value = card.title;
  author.value = card.author;
  pages.value = card.pages;
  theStatus.value = card.theStatus;
}
editButton.addEventListener("click", (e) => editCard(e.target.parentNode));
searchButton.addEventListener("click",() => select());
submitForm.addEventListener("submit", (e) => addNewBook(e));
