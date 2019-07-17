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
    $myInput.addEventListener('keypress', enterPushHandler); //dodaje z Input na enter
    $list.addEventListener('click', listClickManager);
    $cancelPopup.addEventListener('click', closePopup);
    $closeX.addEventListener('click', closePopup);
    $okPopUp.addEventListener('click', acceptChangeHandler);
    $popUpInput.addEventListener('keypress', acceptChangeHandlerOnEnter);//dodaje z popup na enter
}

function prepareInitialList() {
    initialList.forEach(todo => {
        addNewElementToList(todo, id);
        id++;
    });
}

function addButtonClickHandler() {
    if ($myInput.value !== "") {
        addNewElementToList($myInput.value, id);
        id++; 
    }
    $myInput.value = "";
}

function enterPushHandler() {
    //dodaje z input po nacisnięciu enter
    if ($myInput.value !== "" && event.keyCode === 13) {
        addNewElementToList($myInput.value, id);
        id++;
        $myInput.value = "";   
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
    '<span id="titleToDo">' + title + '</span>' +
    '<span id="deleteTodo" class="deleteBtn"> Delete </span>' +
    '<span id="editTodo" class="editBtn"> Edit </span>' +
    '<span id="statusTodo" class="doneBtn"> Done </span>' +
    '</div>';
    return newElement;
}

function listClickManager(event) {
    let selectedId;
    selectedId = event.target.parentElement.parentElement.id;
    editedElement = event.target.parentElement.parentElement;
    if (event.target.className === 'doneBtn') {
        markElementAsDone(selectedId);
    } else if (event.target.className === 'editBtn' && event.target.parentElement.className !== 'done') {
        // nie edytuje jak done
        openPopup(selectedId);
    } else if (event.target.className === 'deleteBtn') {
        removeListElement(selectedId);
    } else if (event.target.className === 'doneBtn back') {
        markElementAsNotDone(selectedId); 
    }
}

function removeListElement(selectedId) {
    document.getElementById(selectedId).remove();
}

function markElementAsDone(selectedId) {
    //zmienia status na "done" i zmienia Btn na Back (powala na powrót do pierowtnego stanu)
    changeStatusTodoClassesToggler(event.target);
    event.target.innerText = "Back";
}

function markElementAsNotDone(selectedId) {
    //task wraca jako niezrobiony
    changeStatusTodoClassesToggler(event.target);
    event.target.innerText = "Done";
}

function changeStatusTodoClassesToggler(toDoElement) {
    toDoElement.parentElement.classList.toggle('done');
    toDoElement.classList.toggle('back');
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

function acceptChangeHandler(id) {
    editedElement.querySelector('span').innerText = $popUpInput.value;
    closePopup();
}

function acceptChangeHandlerOnEnter(id) {
    //edytuje po naciśnięciu enter
    if (event.keyCode === 13) {
        editedElement.querySelector('span').innerText = $popUpInput.value;
        closePopup();
    }
}

document.addEventListener('DOMContentLoaded', main);