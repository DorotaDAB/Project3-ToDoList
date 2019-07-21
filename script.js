let $list;
let $addTodo;
let $myInput;
let id = 1;
let $cancelPopup;
let $closeX;
let $popUpInput;
let $okPopUp;
let editedElement;
let popup;

const initialList = ['Task1', 'Task2', 'Task3'];

function main() {
    prepareDOMElements();
    prepareInitialList();
    prepareDOMEvents();
}

function prepareDOMElements() {
    $list = document.getElementById('list');
    $addTodo = document.getElementById('addTodo');
    $myInput = document.getElementById('myInput');
    $cancelPopup = document.getElementById('cancelPopup');
    $closeX = document.getElementById('closeX');
    $popUpInput = document.getElementById('popUpInput');
    $okPopUp = document.getElementById('okPopUp');
    popup = document.getElementById('popUp');
}

function prepareDOMEvents() {
    $addTodo.addEventListener('click', addButtonClickHandler);
    $myInput.addEventListener('keypress', enterPushHandler);
    $list.addEventListener('click', listClickManager);
    $cancelPopup.addEventListener('click', closePopup);
    $closeX.addEventListener('click', closePopup);
    $okPopUp.addEventListener('click', acceptChangeHandler);
    $popUpInput.addEventListener('keypress', acceptChangeHandlerOnEnter);
}

function prepareInitialList() {
    initialList.forEach(todo => {
        addNewElementToList(todo, id);
        id++;
    });
}

function addButtonClickHandler() {
    if ($myInput.value !== '') {
        addNewElementToList($myInput.value, id);
        id++; 
    }
    $myInput.value = '';
}

function enterPushHandler() {
    if ($myInput.value !== '' && event.keyCode === 13) {
        addNewElementToList($myInput.value, id);
        id++;
        $myInput.value = '';   
    }
}

function addNewElementToList(title, id) {
    const newElement = createElement(title, id);
    $list.appendChild(newElement);
}

function createElement(title , id) {
    const newElement = document.createElement('li');
    newElement.setAttribute('id', id);
    newElement.innerHTML = '<div>' + 
    '<span class="task">' + title + '</span>' + 
    '<span class="btn deleteBtn"> Delete </span>' +
    '<span class="btn editBtn"> Edit </span>' +
    '<span class="btn doneBtn"> Done </span>' +
    '</div>';
    return newElement;
}

function listClickManager(event) {
    let selectedId = event.target.parentElement.parentElement.id;
    editedElement = event.target.parentElement.parentElement;
    if (event.target.className === 'btn doneBtn') {
        toggleStatus(event);
    } else if (event.target.className === 'btn editBtn' && event.target.parentElement.className !== 'done') {
        openPopup(selectedId);
    } else if (event.target.className === 'btn deleteBtn') {
        removeListElement(selectedId);
    } 
}

function removeListElement(selectedId) {
    document.getElementById(selectedId).remove();
}

function toggleStatus(ev) {
    ev.target.parentElement.classList.toggle('done');
    if (ev.target.parentElement.className === 'done') {
        ev.target.innerText = 'Back';
    } else {
        ev.target.innerText = 'Done';
    }
}

function openPopup(selectedId) {
    popup.classList.add('show');
    addDataToPopup(selectedId);
}

function closePopup(selectedId) {
    popup.classList.remove('show'); 
}

function addDataToPopup(selectedId) {
    let editedTask = document.getElementById(selectedId);
    let editedText = editedTask.querySelector('span').innerText;
    $popUpInput.value = editedText;
}

function acceptChangeHandler() {
    editedElement.querySelector('span').innerText = $popUpInput.value; 
    closePopup();
}

function acceptChangeHandlerOnEnter() {
    if (event.keyCode === 13) {
    editedElement.querySelector('span').innerText = $popUpInput.value;
    closePopup();
    } 
}

document.addEventListener('DOMContentLoaded', main);