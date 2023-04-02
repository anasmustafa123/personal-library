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
const openInputModelButtons = document.querySelectorAll('[data-model-target]');
const closeInputModelButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById  ('overlay');


function Book(title, author, pages, theStatus,cardNode) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.theStatus = theStatus;
  this.cardNode = cardNode
}
overlay.addEventListener("click", () => {
  const inputModels = document.querySelectorAll(".input-model.active");
  inputModels.forEach(inputModel => {
    closeModel(inputModel);
  })
})

openInputModelButtons.forEach(button =>{
  button.addEventListener("click", ()=> {
    const inputModel = document.querySelector(button.dataset.modelTarget);
    openModel(inputModel);
  })
})

closeInputModelButtons.forEach(button =>{
  button.addEventListener("click", ()=> {
    const inputModel = button.closest(".input-model.active");
    closeModel(inputModel);
  })
})

function openModel(model){
 if(model == null) return;
 model.classList.add("active");
 overlay.classList.add("active");
}
function closeModel(model){
  if(model == null) return;
  model.classList.remove("active");
  overlay.classList.remove("active");
 }

editButton.addEventListener("click", (e) => editCard(e.target.closest("input.search")));
searchButton.addEventListener("click",() => searchSelected());
submitForm.addEventListener("submit", (e) => {
  addNewBook(e);
/*   const inputModel = e.target.closest(".input-model.active");
  closeModel(inputModel); */
});


function createNewElement(type, className, content) {
  const element = document.createElement(type);
  element.classList.add(className);
  element.textContent = content;
  return element;
}
function addNewBook(e) {
  e.preventDefault();
  let newBook = createNewElement("div", "main-grid-item", "");
  let tempBook = search();
  console.log(` ${tempBook} `)
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
  library.splice(parseInt(card.getAttribute("id")), 1);
}
function changeStatus(e) {
  let next = (parseInt(e.target.parentNode.getAttribute("status")) + 1) % 3;
  let place = parseInt(e.target.parentNode.getAttribute("id"));
  library[place].theStatus = statusOptions[next]
  e.target.parentNode.setAttribute("status", next);
  e.target.textContent = statusOptions[next]
}
function searchSelected(){
  let element = search();
  if(selectedCards.length != 0){
    removeSelectedCard();
  }else{
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
    console.log("actually entered")
    moveDataOf(selectedCards[0]);
    removeSelectedCard();
  }
}
function moveDataOf(card){
  title.value = card.title;
  author.value = card.author;
  pages.value = card.pages;
  theStatus.value = card.theStatus;
}