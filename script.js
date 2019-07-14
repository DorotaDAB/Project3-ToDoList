// Zmienne globalne
let $list;
let $addTodo;
let $myInput;


const initialList = ['ToDo1', 'ToDo2', 'ToDo3'];

function main() {
    prepareDOMElements();
    prepareInitialList();
    prepareDOMEvents();
}

function prepareDOMElements() {
    //przygotowanie- wyszukanie elementów w drzewie DOM
    $list = document.getElementById('list'); //wyszukanie listy
    $addTodo = document.getElementById('addTodo'); //wyszukanie elementów w drzewie DOM - przycisk addToDo
    $myInput = document.getElementById('myInput'); //wyszukanie elementów w drzewie DOM - co wpisane do myInput
}

function prepareDOMEvents() {
    //przygotowanie listenerów
    $addTodo.addEventListener('click', addButtonClickHandler); //na klik doda nowy elememt do poczatkowej listy Initial List
}

function prepareInitialList() {
    //wrzucenie poczatkowych elementów do listy (done by MSK)
    initialList.forEach(todo => {
        addNewElementToList(todo);
    });
}

function addButtonClickHandler() {
    //dodaje do lity wartośc z pola Input, jeżeli niepuste (done)
    if ($myInput.value !== "") {
        addNewElementToList($myInput.value);
    }
}


function addNewElementToList(title   /* Title, author, id */) {
    //obsługa dodawanie elementów do listy
    // $list.appendChild(createElement('nowy', 2))
    const newElement = createElement(title);
    $list.appendChild(newElement);
}

function createElement(title /* Title, author, id */) {
    // Tworzyc reprezentacje DOM elementu return newElement
    // return newElement
    const newElement = document.createElement('li');
    newElement.innerText = title;

    return newElement;
}

function listClickManager(/* event- event.target */) {
    // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
    // event.target.parentElement.id
    // if(event.target.className === 'edit') { editListElement(id) }
}

function removeListElement(/* id */) {
    // Usuwanie elementu z listy
}

function editListElement(/* id */) {
    // Pobranie informacji na temat zadania
    // Umieść dane w popupie
}

function addDataToPopup(/* Title, author, id */) {
    // umieść informacje w odpowiednim miejscu w popupie
}

function acceptChangeHandler() {
    // pobierz dane na temat zadania z popupu (id, nowyTitle, nowyColor ...)
    // Następnie zmodyfikuj element listy wrzucając w niego nowyTitle, nowyColor...
    // closePopup()
}

function openPopup() {
    // Otwórz popup
}

function closePopup() {
    // Zamknij popup
}

function declineChanges() { //niepotrzebna raczej
    // closePopup()
}

function markElementAsDone(/* id */) {
    //zaznacz element jako wykonany (podmień klasę CSS)
}

document.addEventListener('DOMContentLoaded', main);