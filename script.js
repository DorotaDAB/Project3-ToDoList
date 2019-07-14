let $list;
let $addTodo;
let $myInput;
let id = 1;

const initialList = ['ToDo1', 'ToDo2', 'ToDo3'];

function main() {
    prepareDOMElements();
    prepareInitialList();
    prepareDOMEvents();
}

function prepareDOMElements() {
    $list = document.getElementById('list');
    $addTodo = document.getElementById('addTodo');
    $myInput = document.getElementById('myInput');
}

function prepareDOMEvents() {
    $addTodo.addEventListener('click', addButtonClickHandler); //na klik doda nowy elememt do listy
    $list.addEventListener('click', listClickManager); //sprawdź co kliknęliśmy
}

function prepareInitialList() {
    //wrzucenie poczatkowych elementów do listy
    initialList.forEach(todo => {
        addNewElementToList(todo, id);
        id++;
    });
   
}

function addButtonClickHandler() {
    //dodaje do lity wartośc z pola Input, jeżeli niepuste
    if ($myInput.value !== "") {
        addNewElementToList($myInput.value, id);
    }
}

function addNewElementToList(title, id) {
    const newElement = createElement(title, id);
    $list.appendChild(newElement);
}

function createElement(title , id) {
    const newElement = document.createElement('li');
    newElement.innerHTML = '<div id="'+ id + '">' + title + 
    '<span id="deleteTodo" class="delete"> Delete </span>' +
    '<span id="editTodo" class="edit"> Edit </span>' +
    '<span id="doneTodo" class="done"> Done </span>' +
    '</div>';
    return newElement;
}

function listClickManager(event) {
    // sprawdza co zostało klikniete (robocze)
    if (event.target.className === 'done') {
        console.log('done');
    } else if (event.target.className === 'edit') {
        console.log('edit');
    } else if (event.target.className === 'delete') {
        console.log('delete');
    } else console.log(event.target.id);
}

document.addEventListener('DOMContentLoaded', main);