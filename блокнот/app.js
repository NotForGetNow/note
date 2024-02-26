const inputElement = document.getElementById('title');
const createBtn = document.getElementById('create');
const listElement = document.getElementById('list');

const notes = [
    {
        title: 'Купи краба',
        status: true
    },
    {
        title: 'Яблоки не забудь',
        status: false
    }
];

function render() {
    for (let note of notes) {
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(note));
    }
}

render();

createBtn.onclick = function () {
    if (inputElement.value.length === 0) {
        return;
    }

    const newNote = {
        title: inputElement.value,
        status: false
    };

    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(newNote));
    inputElement.value = '';

    // Обновление обработчиков событий после добавления новой заметки
    updateEventListeners();
};

function updateEventListeners() {
    const successButtons = document.querySelectorAll('.btn-success');
    const deleteButtons = document.querySelectorAll('.btn-danger');

    successButtons.forEach(button => {
        button.onclick = function() {
            const listItem = button.closest('li');
            const noteText = listItem.querySelector('span');
            noteText.style.textDecoration = 'line-through';
        };
    });

    deleteButtons.forEach(button => {
        button.onclick = function() {
            const listItem = button.closest('li');
            listElement.removeChild(listItem);
        };
    });
}

function getNoteTemplate(note) {
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${note.title}</span>
            <span>
                <button class="btn btn-small btn-success">&check;</button>
                <button class="btn btn-small btn-danger">&times;</button>
            </span>
        </li>`;
}

// Вызов функции обновления обработчиков событий после загрузки страницы
updateEventListeners();

