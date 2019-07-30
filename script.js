let $list;
let $addTodo;
let $myInput;
let $cancelPopup;
let $closeX;
let $popUpInput;
let $okPopUp;
let editedElement;
let popup;

function main() {
    prepareDOMElements();
    displayList()
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

async function displayList() {
    let response = await axios.get('http://195.181.210.249:3000/todo/'); 
    response.data.forEach(addTodo);
    function addTodo(todo) {
        if (todo.author === 'Dorota') {
            addNewElementToList(todo.title, todo.id, todo.extra); 
        }
    }
}

function refreshList() {
    clearTodoList();
    displayList();
}

function clearTodoList() {
    let initialLength = $list.childElementCount;
    for (i = 0; i < initialLength; i++ ) {
        $list.removeChild($list.childNodes[0]);
    }
}

async function addButtonClickHandler(todo) {
    if ($myInput.value !== '') {
        let response = await axios.post('http://195.181.210.249:3000/todo/', {
        title: $myInput.value,
        author: 'Dorota',
        extra: 'notDone'
    });
    addNewElementToList($myInput.value, todo.id, todo.extra);
    refreshList();
    }
    $myInput.value = '';
}

async function enterPushHandler(todo) {
    if ($myInput.value !== '' && event.keyCode === 13) {
        let response = await axios.post('http://195.181.210.249:3000/todo/', {
        title: $myInput.value,
        author: 'Dorota',
        extra: 'notDone'
    });
        addNewElementToList($myInput.value, todo.id, todo.extra);
        refreshList();
        $myInput.value = '';   
    }
}

function addNewElementToList(title, id, extra) {
    const newElement = createElement(title, id, extra);
    $list.appendChild(newElement);
}

function createElement(title , id, extra) {
    const newElement = document.createElement('li');
    newElement.setAttribute('id', id);
    if (extra === 'done') {
        newElement.innerHTML = '<div class=' + extra + '>' + 
        '<span class="task">' + title + '</span>' + 
        '<span class="btn deleteBtn"> Delete </span>' +
        '<span class="btn editBtn"> Edit </span>' +
        '<span class="btn doneBtn"> Back </span>' +
        '</div>';
    } else {
        newElement.innerHTML = '<div class=' + extra + '>' + 
        '<span class="task">' + title + '</span>' + 
        '<span class="btn deleteBtn"> Delete </span>' +
        '<span class="btn editBtn"> Edit </span>' +
        '<span class="btn doneBtn"> Done </span>' +
        '</div>';
    } 
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

async function removeListElement(seledtedId) {
    await axios.delete('http://195.181.210.249:3000/todo/' + seledtedId);
    refreshList();
}

async function toggleStatus(ev) {
    if (ev.target.parentElement.className === 'done') {
        await changeTodoStatus('notDone');
    } else {
        await changeTodoStatus('done');
    }
    refreshList();
}

async function changeTodoStatus(todoStatus) {
    await axios.put('http://195.181.210.249:3000/todo/' + editedElement.id, {
        extra: todoStatus
    })
}

function openPopup(selectedId) {
    popup.classList.add('show');
    addDataToPopup(selectedId);
}

function closePopup() {
    popup.classList.remove('show'); 
}

function addDataToPopup(selectedId) {
    let editedTask = document.getElementById(selectedId);
    let editedText = editedTask.querySelector('span').innerText;
    $popUpInput.value = editedText;
}

async function acceptChangeHandler() {
    await axios.put('http://195.181.210.249:3000/todo/' + editedElement.id, {
                title: $popUpInput.value
        });
    refreshList();
    closePopup();
}

async function acceptChangeHandlerOnEnter() {
    if (event.keyCode === 13) {
        await axios.put('http://195.181.210.249:3000/todo/' + editedElement.id, {
                title: $popUpInput.value
        });
    editedElement.querySelector('span').innerText = $popUpInput.value;
    refreshList();
    closePopup();
    } 
}

document.addEventListener('DOMContentLoaded', main);